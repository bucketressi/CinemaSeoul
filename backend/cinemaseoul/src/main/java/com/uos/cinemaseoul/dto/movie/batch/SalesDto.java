package com.uos.cinemaseoul.dto.movie.batch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesDto {
    private String sale_date;
    private int movi_sale;
    private int prod_sale;
    private int total_sale;
}
