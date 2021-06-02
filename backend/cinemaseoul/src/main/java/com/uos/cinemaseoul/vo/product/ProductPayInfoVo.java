package com.uos.cinemaseoul.vo.product;

import com.uos.cinemaseoul.dto.product.productpay.ProductInfoInsertDto;
import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class ProductPayInfoVo {
    private int prod_pay_info_id;
    private int prod_pay_id;
    private int prod_id;
    private String prod_name;
    private int amount;
    private int price;

    public ProductPayInfoVo(int prod_pay_id, int prod_id, int amount, int price) {
        this.prod_pay_id = prod_pay_id;
        this.prod_id = prod_id;
        this.amount = amount;
        this.price = price;
    }
}
