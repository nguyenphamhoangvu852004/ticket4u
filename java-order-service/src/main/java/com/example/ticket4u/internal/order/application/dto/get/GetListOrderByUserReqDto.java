package com.example.ticket4u.internal.order.application.dto.get;

public class GetListOrderByUserReqDto extends GetListOrderReqDto {
   private String userId;

   public GetListOrderByUserReqDto() {
   }

   public GetListOrderByUserReqDto(String page, String size, String userId) {
       super(page, size);
       this.userId = userId;
   }

   public String getUserId() {
    return userId;
   }

   public void setUserId(String userId) {
    this.userId = userId;
   }

   @Override
   public String getPage() {
    // TODO Auto-generated method stub
    return super.getPage();
   }

   @Override
   public String getSize() {
    // TODO Auto-generated method stub
    return super.getSize();
   }

   @Override
   public void setPage(String page) {
    // TODO Auto-generated method stub
    super.setPage(page);
   }

   @Override
   public void setSize(String size) {
    // TODO Auto-generated method stub
    super.setSize(size);
   }

}
