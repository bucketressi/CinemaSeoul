package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InsertCastDto {
    private int movi_id;
    private List<CastingInfoDto> casting;
}
