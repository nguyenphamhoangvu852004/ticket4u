package com.example.ticket4u.pkg.response;


public class PaginationResponse {
    private int page;
    private int pageSize;
    private int totalPage;
    private int totalItems;

    public PaginationResponse() {
    }
    
    public PaginationResponse(int page, int pageSize, int totalPage, int totalItems) {
        this.page = page;
        this.pageSize = pageSize;
        this.totalPage = totalPage;
        this.totalItems = totalItems;
    }

    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }
    public int getPageSize() {
        return pageSize;
    }
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    public int getTotalPage() {
        return totalPage;
    }
    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
    public int getTotalItems() {
        return totalItems;
    }
    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }

}
