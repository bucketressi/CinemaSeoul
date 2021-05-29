package com.uos.cinemaseoul.dto.book.book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
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

    public BookDto(int book_id, int book_pay_id, int teen, int adult, int senior,
                   int impaired, String book_datetime, String show_date, String show_time,
                   String movi_name, int run_time, String hall_name){
        this.book_id =book_id;
        this.book_pay_id = book_pay_id;
        this.teen = teen;
        this.adult = adult;
        this.senior = senior;
        this.impaired = impaired;
        this.book_datetime = book_datetime;
        this.show_date = show_date;
        this.show_time = show_time;
        this.movi_name = movi_name;
        this.run_time = run_time;
        this.hall_name = hall_name;
    }

}
