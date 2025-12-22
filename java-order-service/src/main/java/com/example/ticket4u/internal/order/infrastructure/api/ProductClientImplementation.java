package com.example.ticket4u.internal.order.infrastructure.api;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.example.ticket4u.internal.order.domain.repositoryInterface.ProductClientInterface;
import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketResDto;
import com.example.ticket4u.pkg.errorCustom.ErrorCustom;

import reactor.core.publisher.Mono;

@Repository
public class ProductClientImplementation implements ProductClientInterface {
    private final WebClient webClient;

    public ProductClientImplementation(
            WebClient.Builder builder,
            @Value("${app.product-url}") String baseUrl) {

        this.webClient = builder
                .baseUrl(baseUrl + "/tickets")
                .build();
        System.out.println("baseUrl: " + baseUrl);
    }

    // @Override
    // public boolean isExists(String productId) {
    //     try {
    //         System.out.println("Calling ProductClientImplementation.IsExists with productId: " + productId);
    //           webClient.get()
    //                 .uri("/" + productId)
    //                 .retrieve()
    //                 .toBodilessEntity()
    //                 .block();

    //         return true;
    //     } catch (WebClientResponseException e) {
    //         if (e.getStatusCode() == HttpStatus.NOT_FOUND)
    //             return false;
    //         throw new RuntimeException("HTTP error: " + e.getStatusCode(), e);
    //     } catch (Exception e) {
    //         System.err.println(e.getMessage());
    //         throw new RuntimeException("Error calling remote API", e);
    //     }
    // }

    @Override
    public TicketResDto getTicketById(String ticketId) {
        TicketResDto resDto = webClient.get()
            .uri("/" + ticketId)
            .retrieve()
            .onStatus(status -> status.is4xxClientError(), resp ->
                resp.bodyToMono(String.class)
                    .flatMap(body -> Mono.<ErrorCustom>error(new ErrorCustom(404, "Product not found")))
            )
            .onStatus(status -> status.is5xxServerError(), resp ->
                resp.bodyToMono(String.class)
                    .flatMap(body -> Mono.<ErrorCustom>error(new ErrorCustom(500, "Product service internal error")))
            )
            .bodyToMono(TicketResDto.class)
            .block();

        if (resDto == null || resDto.getData() == null) {
            throw new ErrorCustom(404, "Product not found ");
        }
        return resDto;
    }


}
