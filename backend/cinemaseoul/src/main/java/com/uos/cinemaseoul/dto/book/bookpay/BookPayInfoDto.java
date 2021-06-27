package com.uos.cinemaseoul.dto.book.bookpay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookPayInfoDto {
    private int book_pay_id;
    private int user_id;
    private int book_id;

    private int use_point;
    private int price;
    private int accu_point;

    private String pay_type;
    private String pay_state_code;
    private String pay_datetime;

    private String use_datetime;
    //sha-1 after 16bytes
    private String use_code;

    private String show_date;
    private String show_time;
    private String movi_name;


}
