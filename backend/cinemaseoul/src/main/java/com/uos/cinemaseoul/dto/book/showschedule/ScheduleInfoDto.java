package com.uos.cinemaseoul.dto.book.showschedule;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScheduleInfoDto {
    private int show_id;
    private int movi_id;
    private int hall_id;
    private String hall_name;
    private String show_date;
    private String show_time;
    private String movi_name;
    private String end_time;
    private String started;

    private int hall_seat;
    @JsonIgnore
    private int avai_seat_amount;
    private int rema_seat;
}
