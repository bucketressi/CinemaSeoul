package com.uos.cinemaseoul.vo.user;

import lombok.*;

@Getter
@ToString
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class PointVo {
    private int poin_id;
    private int user_id;
    private int poin_amount;
    private String poin_type_code;
    private String message;
    private String poin_datetime;


}
