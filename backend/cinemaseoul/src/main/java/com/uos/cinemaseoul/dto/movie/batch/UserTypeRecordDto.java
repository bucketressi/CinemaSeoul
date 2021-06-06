package com.uos.cinemaseoul.dto.movie.batch;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTypeRecordDto {
    private int user_id;
    private String upda_datetime;
    private int accu_point;
    private String user_type;
}
