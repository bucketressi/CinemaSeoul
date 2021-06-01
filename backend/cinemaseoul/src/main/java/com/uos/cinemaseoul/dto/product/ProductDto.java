package com.uos.cinemaseoul.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private int prod_id;
    private String prod_name;
    private int price;
    private String prod_type_code;
    private int limit;
    private String prod_contents;
    private byte[] image;
}
