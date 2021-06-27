package com.uos.cinemaseoul.dto.book.book;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookListInfoDto {

    private int book_id;
    private int book_pay_id;

    //인원 정보
    private String user_name;

    //예매 정보
    private String book_datetime;

    //상영 정보
    private String show_date;
    private String show_time;

    //영화 정보
    private String movi_name;

    //상영관 정보
    private String hall_name;


}
