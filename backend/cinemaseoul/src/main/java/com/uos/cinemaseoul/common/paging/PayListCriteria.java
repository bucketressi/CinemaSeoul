package com.uos.cinemaseoul.common.paging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayListCriteria extends Criteria{
    private int user_id;
    private String start_date;
    private String end_date;
}
