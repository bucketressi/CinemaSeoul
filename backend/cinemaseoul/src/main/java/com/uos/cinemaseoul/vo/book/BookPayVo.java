package com.uos.cinemaseoul.vo.book;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class BookPayVo {
    private int book_pay_id;
    private int user_id;
    private int use_point;
    private int price;
    private String pay_type_code;
    private String pay_state_code;
    private int accu_point;
    private String pay_datetime;
    private String use_datetime;

    //sha-1 after 16bytes
    private String use_code;

    public void setBook_pay_id(int book_pay_id){
        this.book_pay_id = book_pay_id;
    }
}
