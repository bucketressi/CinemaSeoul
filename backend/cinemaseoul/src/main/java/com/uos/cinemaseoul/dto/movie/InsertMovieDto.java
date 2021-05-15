package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.NonNull;

@Data
@AllArgsConstructor
public class InsertMovieDto {

    @NonNull
    private String movi_name;
    @NonNull
    private int avai_age_code;
    @NonNull
    private String show_time;
    //nullable
    private String company;
    //nullable
    private String movi_contents;
    @NonNull
    private String open_date;
    private int[] genre;
    private int[] cast_director;
    private int[] cast_actor;
    //nullable
    private byte[] image;

}
