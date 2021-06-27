package com.uos.cinemaseoul.dto.book.showschedule;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InsertScheduleDto {
    private int show_id;
    private int movi_id;
    private int hall_id;
    private String show_date;
    private String show_time;
}
