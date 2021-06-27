package com.uos.cinemaseoul.dto.book.bookpay;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BookPayInsertDto {
    private int show_id;
    private int user_id;
    private int teen;
    private int adult;
    private int senior;
    private int impaired;

    private int hall_id;
    private List<Integer> seat_list;

    private int use_point;
    private int price;
    private String pay_type_code;

    private String use_code;
    private int accu_point;
}
