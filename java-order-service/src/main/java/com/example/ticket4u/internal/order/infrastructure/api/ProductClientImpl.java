package com.example.ticket4u.internal.order.infrastructure.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Repository;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.ticket4u.internal.order.domain.repositoryInterface.IProductClient;
import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketData;
import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketResponseData;
import com.example.ticket4u.pkg.errorCustom.ErrorCustom;

import jakarta.el.ListELResolver;
import reactor.core.publisher.Mono;

@Repository
public class ProductClientImpl implements IProductClient {
        private final WebClient webClient;

        public ProductClientImpl(
                        WebClient.Builder builder,
                        @Value("${app.product-url}") String baseUrl) {

                this.webClient = builder
                                .baseUrl(baseUrl + "/tickets")
                                .build();
        }

        // @Override
        // public boolean isExists(String productId) {
        // try {
        // System.out.println("Calling ProductClientImplementation.IsExists with
        // productId: " + productId);
        // webClient.get()
        // .uri("/" + productId)
        // .retrieve()
        // .toBodilessEntity()
        // .block();

        // return true;
        // } catch (WebClientResponseException e) {
        // if (e.getStatusCode() == HttpStatus.NOT_FOUND)
        // return false;
        // throw new RuntimeException("HTTP error: " + e.getStatusCode(), e);
        // } catch (Exception e) {
        // System.err.println(e.getMessage());
        // throw new RuntimeException("Error calling remote API", e);
        // }
        // }

        @Override
        public TicketResponseData<TicketData> getTicketById(String ticketId) {

                // all api to get the ticket and cache here
                TicketResponseData<TicketData> resDto = webClient.get()
                                .uri("/" + ticketId)
                                .retrieve()
                                .onStatus(status -> status.is4xxClientError(), resp -> resp.bodyToMono(String.class)
                                                .flatMap(body -> Mono.<ErrorCustom>error(
                                                                new ErrorCustom(404, "Product not found"))))
                                .onStatus(status -> status.is5xxServerError(), resp -> resp.bodyToMono(String.class)
                                                .flatMap(body -> Mono
                                                                .<ErrorCustom>error(new ErrorCustom(500,
                                                                                "Product service internal error"))))
                                .bodyToMono(new ParameterizedTypeReference<TicketResponseData<TicketData>>() {
                                })
                                .block();

                if (resDto == null || resDto.getData() == null) {
                        throw new ErrorCustom(404, "Product not found ");
                }
                return resDto;
        }

        @Override
        public TicketResponseData<List<TicketData>> getTicketsByIds(List<String> ids) {

                String idsParam = String.join(",", ids);

                TicketResponseData<List<TicketData>> resDto = this.webClient.get()
                                .uri(uriBuilder -> uriBuilder
                                                .path("") // nhớ đúng path
                                                .queryParam("ids", idsParam)
                                                .build())
                                .retrieve()
                                .onStatus(status -> status.is4xxClientError(), resp -> resp.bodyToMono(String.class)
                                                .flatMap(body -> Mono.error(new ErrorCustom(404, "Tickets not found"))))
                                .onStatus(status -> status.is5xxServerError(), resp -> resp.bodyToMono(String.class)
                                                .flatMap(body -> Mono.error(
                                                                new ErrorCustom(500, "Ticket service internal error"))))
                                .bodyToMono(new ParameterizedTypeReference<TicketResponseData<List<TicketData>>>() {
                                })
                                .block();

                if (resDto == null || resDto.getData() == null || resDto.getData().isEmpty()) {
                        throw new ErrorCustom(404, "Tickets not found");
                }

                return resDto;
        }
}
