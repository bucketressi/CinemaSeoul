package com.uos.cinemaseoul.dto.movie.batch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DateRangeDto {
    private String start_date;
    private String end_date;
}
