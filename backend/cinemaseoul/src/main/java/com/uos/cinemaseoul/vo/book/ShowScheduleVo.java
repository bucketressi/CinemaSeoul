package com.uos.cinemaseoul.vo.book;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ShowScheduleVo {
    private int show_id;
    private int movi_id;
    private int hall_id;
    private String hall_name;
    private String show_date;
    private String show_time;
}
