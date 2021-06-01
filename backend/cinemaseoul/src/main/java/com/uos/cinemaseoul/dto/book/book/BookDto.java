package com.uos.cinemaseoul.dto.book.book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {

    private int book_id;
    private int book_pay_id;

    //인원 정보
    private String user_name;

    //영화 정보
    private int teen;
    private int adult;
    private int senior;
    private int impaired;
    private String book_datetime;

    //상영 정보
    private String show_date;
    private String show_time;

    //영화 정보
    private String movi_name;
    private int run_time;

    //상영관 정보
    private String hall_name;

    //좌석 정보
    private int[] seat_num;
}
