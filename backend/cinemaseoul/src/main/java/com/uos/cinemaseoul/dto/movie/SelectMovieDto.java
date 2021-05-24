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

    private int movi_id;
    private String movi_name;
    private String avai_age;
    private String run_time;
    private String company;
    private String movi_contents;
    private byte[] image;
    private String open_date;

    //장르
    private String[] genre;

    private List<CastingInfoDto> casting = new ArrayList<>();
    private float rating;
    private int accu_audience;

}
