package com.uos.cinemaseoul.dto.product.productpay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPayInsertDto {
    private int user_id;
    private int use_point;
    private int total_price;
    private String pay_type_code;
    private List<ProductInfoInsertDto> productInfo = new ArrayList<>();
}
