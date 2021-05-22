package com.uos.cinemaseoul.vo.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SeatVo {
    private int hall_id;
    private int seat_num;
    private String seat_type_code;
}
