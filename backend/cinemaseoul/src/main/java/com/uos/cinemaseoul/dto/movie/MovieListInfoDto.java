package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieListInfoDto {
    private int rnum;
    private int movi_id;
    private String movi_name;
    private float rating;
    private byte[] image;
}
