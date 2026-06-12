package com.ticket4u.infrastructure.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticket4u.domain.entity.OrderItemEntity;
import com.ticket4u.domain.repositoryInterface.IProductClient;
import com.ticket4u.infrastructure.api.dto.TicketData;
import com.ticket4u.infrastructure.api.dto.TicketResponseData;
import com.ticket4u.infrastructure.api.dto.requestDTO.ReduceStockReqDTO;
import com.ticket4u.infrastructure.api.dto.requestDTO.ReduceStockTicketDTO;
import com.ticket4u.pkg.errorCustom.ErrorCustom;

import jakarta.el.ListELResolver;
import reactor.core.publisher.Mono;

@Repository
public class ProductClientImpl implements IProductClient {
        private final WebClient webClient;

        public ProductClientImpl(
                        WebClient.Builder builder,
                        @Value("${app.product-url}") String baseUrl) {

                // this.webClient = builder
                // .baseUrl(baseUrl + "/tickets")
                // .build();

                this.webClient = builder
                                .baseUrl("http://localhost:8085/api/v1/2025" + "/tickets")
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

        @Override
        public void reduceStock(String orderId, List<OrderItemEntity> items) {

                try {

                        ReduceStockReqDTO body = ReduceStockReqDTO.builder()
                                        .orderId(orderId)
                                        .tickets(
                                                        items.stream()
                                                                        .map(item -> ReduceStockTicketDTO.builder()
                                                                                        .ticketId(item.getTicketUuid())
                                                                                        .amount(item.getQuantity())
                                                                                        .build())
                                                                        .toList())
                                        .build();

                        ObjectMapper mapper = new ObjectMapper();

                        String json = mapper.writeValueAsString(body);

                        System.out.println("REQUEST BODY:");
                        System.out.println(json);

                        String response = this.webClient.put()
                                        .uri("")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .bodyValue(body)
                                        .exchangeToMono(clientResponse -> {

                                                System.out.println(
                                                                "STATUS: " + clientResponse.statusCode());

                                                return clientResponse.bodyToMono(String.class);
                                        })
                                        .block();

                        System.out.println("RESPONSE:");
                        System.out.println(response);

                } catch (Throwable e) {
                        e.printStackTrace();
                }
        }
}
