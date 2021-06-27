package com.uos.cinemaseoul.vo.movie;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class UserTypeRecordVo {
    private int user_id;
    private String upda_datetime;
    private String user_type_code;
    private int accu_point;
}
