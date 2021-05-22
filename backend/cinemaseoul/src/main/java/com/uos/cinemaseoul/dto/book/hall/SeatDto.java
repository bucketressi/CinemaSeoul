package com.uos.cinemaseoul.dto.book.hall;

import com.uos.cinemaseoul.vo.book.SeatVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class SeatDto {
    private int hall_id;
    private int seat_num;
    private String seat_type_code;
}
