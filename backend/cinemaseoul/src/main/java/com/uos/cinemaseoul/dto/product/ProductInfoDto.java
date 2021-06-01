package com.uos.cinemaseoul.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoDto {
    private int prod_id;
    private String prod_name;
    private int price;
    private int number;
    private byte[] image;
}
