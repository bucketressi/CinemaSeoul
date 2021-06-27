package com.uos.cinemaseoul.dto.product.productpay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoShortDto {
    private int prod_id;
    private String prod_name;
    private int price;
    private int amount;
}
