package com.uos.cinemaseoul.common.paging;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieSearchCriteria extends Criteria{
    private String name;
    private String cast_type_code;
}
