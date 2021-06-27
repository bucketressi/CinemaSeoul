package com.uos.cinemaseoul.dto.movie.batch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AudienceRecordSumDto {
    private int sum;
    List<AudienceRecordDto> records = new ArrayList<>();
}
