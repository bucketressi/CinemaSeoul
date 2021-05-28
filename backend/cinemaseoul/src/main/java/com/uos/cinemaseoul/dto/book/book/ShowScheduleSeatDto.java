package com.uos.cinemaseoul.dto.book.book;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowScheduleSeatDto {
    private int hall_id;
    private int seat_num;
    private int seat_type;
    private boolean is_booked = false;
}
