package com.uos.cinemaseoul.common.paging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AskCriteria extends Criteria{
    private int answered;
    private Integer user_id;
}
