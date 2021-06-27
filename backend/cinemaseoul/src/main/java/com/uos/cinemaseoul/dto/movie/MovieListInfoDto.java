package com.uos.cinemaseoul.dto.movie;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieListInfoDto {
    @JsonIgnore
    private int rnum;

    private int movi_id;
    private String movi_name;
    private String avai_age;
    private String open_date;
    private float rating;
    private int accu_audience;
    @JsonIgnore
    private byte[] image;
    private String imageBase64;
}
