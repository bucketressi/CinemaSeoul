package com.uos.cinemaseoul.vo.movie;


import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class SalesVo {
    private String sale_date;
    private int movi_sales;
    private int prod_sales;
    private int tota_sales;
}
