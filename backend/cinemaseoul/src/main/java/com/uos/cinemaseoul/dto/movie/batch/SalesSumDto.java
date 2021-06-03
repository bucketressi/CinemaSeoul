package com.uos.cinemaseoul.dto.movie.batch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesSumDto {
    private int movi_total;
    private int prod_total;
    private int total_sum;

    List<SalesDto> sales = new ArrayList<>();
}
