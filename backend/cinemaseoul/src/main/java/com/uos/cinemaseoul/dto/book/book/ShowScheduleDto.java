package com.uos.cinemaseoul.dto.book.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowScheduleDto {
    private int show_id;

    private int movi_id;
    private String movi_name;

    private int hall_id;
    private String hall_name;

    private String show_date;
    private String show_time;
    private String end_time;

    private int hall_seat;
    private int rema_amount;
}
