package com.uos.cinemaseoul.vo.product;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class ProductVo {
    private int prod_id;
    private String prod_name;
    private int price;
    private String prod_type_code;
    private int limit;
    private String prod_contents;
    private byte[] image;
}
