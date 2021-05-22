package com.uos.cinemaseoul.dto.book.hall;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HallInfoDto {
    private int hall_id;
    private String hall_name;
    private int hall_row;
    private int hall_col;
    private List<SeatDto> seats = new ArrayList<>();

}
