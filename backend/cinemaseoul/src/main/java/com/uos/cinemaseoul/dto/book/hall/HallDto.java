package com.uos.cinemaseoul.dto.book.hall;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HallDto {
    private int hall_id;
    private String hall_name;
    private int hall_row;
    private int hall_col;
}
