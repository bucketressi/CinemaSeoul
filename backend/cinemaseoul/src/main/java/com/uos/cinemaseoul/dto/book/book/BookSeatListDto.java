package com.uos.cinemaseoul.dto.book.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookSeatListDto {
    private int hall_id;
    private int hall_col;
    private int hall_row;
    List<ShowScheduleSeatDto> seat_list = new ArrayList<>();
}
