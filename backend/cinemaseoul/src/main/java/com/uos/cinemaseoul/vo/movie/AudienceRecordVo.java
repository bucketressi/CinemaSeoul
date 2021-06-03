package com.uos.cinemaseoul.vo.movie;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class AudienceRecordVo {
    private String reco_date;
    private int movi_id;
    private int audi_amount;
}
