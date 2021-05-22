package com.uos.cinemaseoul.dto.user.point;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PointUpdateDto {
    private int user_id;
    private int poin_amount;
    private String message;
    private String poin_type_code;
}
