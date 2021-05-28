package com.uos.cinemaseoul.dto.book.book;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowScheduleFromDateMovieDto {
    private int showschedule_id;
    private String movi_name;
    private String hall_name;
    private String show_date;
    private String show_time;
    private int rema_amount;
}
