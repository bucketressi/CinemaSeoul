package com.uos.cinemaseoul.vo.book;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class HallVo {
    private int hall_id;
    private String hall_name;
    private int hall_row;
    private int hall_col;
}
