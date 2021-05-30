package com.uos.cinemaseoul.vo.book;

import lombok.*;


@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class BookVo {
    private int book_id;
    private int user_id;
    private int show_id;
    private int book_pay_id;
    private int teen;
    private int adult;
    private int senior;
    private int impaired;
    private String book_datetime;

    public void setBook_id(int book_id) {
        this.book_id = book_id;
    }

    public void setBook_pay_id(int book_pay_id) {
        this.book_pay_id = book_pay_id;
    }
}
