package com.uos.cinemaseoul.dto.movie.batch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AudienceRecordDto {
    private String reco_date;
    private int audi_amount;
}
