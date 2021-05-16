package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class SelectMovieDto {

    private String movi_id;
    private String movi_name;
    private int avai_age_code;
    private String show_time;
    private String company;
    private String movi_contents;
    private byte[] image;
    private String open_date;

    //장르
    private int[] genre;

    private List<CastingInfoDto> casting = new ArrayList<>();
    private float rating;
    private float bookrecord;

}
