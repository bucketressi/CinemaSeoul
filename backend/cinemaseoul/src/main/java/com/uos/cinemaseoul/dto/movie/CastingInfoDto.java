package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CastingInfoDto {
    private int peop_id;
    private String peop_name;
    private int cast_type_code;
}
