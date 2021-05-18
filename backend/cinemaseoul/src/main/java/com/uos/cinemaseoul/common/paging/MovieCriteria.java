package com.uos.cinemaseoul.common.paging;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieCriteria extends Criteria {
    private int stat;
    private String[] genre_code;
    private String[] avai_age_code;
    private int sort;
}
