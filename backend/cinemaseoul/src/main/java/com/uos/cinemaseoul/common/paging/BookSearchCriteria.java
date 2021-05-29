package com.uos.cinemaseoul.common.paging;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookSearchCriteria extends Criteria{
    private int user_id;
    private String start_date;
    private String end_date;
}
