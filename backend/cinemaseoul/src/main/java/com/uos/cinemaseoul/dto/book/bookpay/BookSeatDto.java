package com.uos.cinemaseoul.dto.book.bookpay;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookSeatDto {
    private int book_id;
    private int hall_id;
    private int seat_num;
    private int show_id;
}
