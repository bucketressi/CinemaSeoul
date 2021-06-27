package com.uos.cinemaseoul.dto.product.productpay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPayListDto {
    List<ProductPayInfoDto> prodpayinfo = new ArrayList<>();
    private int page;
    private int totalpage;
    private int amount;

    public void setPageInfo(int totalPage, int page, int amount) {
        this.totalpage = totalPage;
        this.page = page;
        this.amount = amount;
    }
}
