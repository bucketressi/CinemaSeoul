package com.uos.cinemaseoul.dto.book.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowScheduleSeatDto {
    private int seat_num;
    private String seat_type;
    private boolean booked = false;
}
