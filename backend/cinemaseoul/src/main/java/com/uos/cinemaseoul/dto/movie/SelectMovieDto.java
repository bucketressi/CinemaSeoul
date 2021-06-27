package com.uos.cinemaseoul.dto.movie;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectMovieDto {

    private int movi_id;
    private String movi_name;
    private String avai_age;
    private int run_time;
    private String company;
    private String movi_contents;
    @JsonIgnore
    private byte[] image;
    private String imageBase64;
    private String open_date;

    //장르
    private String[] genre;

    private List<CastingInfoDto> casting = new ArrayList<>();
    private float rating;
    private int accu_audience;

}
