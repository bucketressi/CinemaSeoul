package com.uos.cinemaseoul.dto.product.productpay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoInsertDto {
    private int prod_id;
    private int amount;
    private int price;
}
