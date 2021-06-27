package com.uos.cinemaseoul.dto.product.productpay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPayInfoDto {

    private int prod_pay_id;
    private int user_id;

    private int use_point;
    private int price;
    private int accu_point;

    private String pay_type;
    private String pay_state_code;
    private String pay_datetime;

    private String use_datetime;
    //sha-1 after 16bytes
    private String use_code;

    List<ProductInfoShortDto> productPayDetails = new ArrayList<>();

}
