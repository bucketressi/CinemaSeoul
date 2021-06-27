package com.uos.cinemaseoul.dto.user.point;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PointInfoDto {
    private int poin_id;
    private int poin_amount;
    private String poin_type;
    private String message;
    private String poin_datetime;
}
