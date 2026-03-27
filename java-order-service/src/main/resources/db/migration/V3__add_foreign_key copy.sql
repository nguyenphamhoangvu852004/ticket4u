alter table order_details 
-- Không có bảng ticket
-- add constraint fk_order_details_ticket_id foreign key (ticket_id) references tickets(id),
add constraint fk_order_details_order_id foreign key (order_id) references orders(id);

alter table orders 
-- add constraint fk_orders_user_id foreign key (user_id) references users(id);