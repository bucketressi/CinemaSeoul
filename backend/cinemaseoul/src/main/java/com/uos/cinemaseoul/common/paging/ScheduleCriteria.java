package com.uos.cinemaseoul.common.paging;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScheduleCriteria extends Criteria{
    private int[] movi_id;
    private int[] hall_id;
    private String start_date;
    private String end_date;
}
