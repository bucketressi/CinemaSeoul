package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.NonNull;

import java.util.List;

@Data
@AllArgsConstructor
public class InsertMovieDto {

    @NonNull
    private String movi_name;
    @NonNull
    private String avai_age_code;
    @NonNull
    private String run_time;
    //nullable
    private String company;
    //nullable
    private String movi_contents;
    @NonNull
    private String open_date;
    private int[] genre_code;
    private List<CastingInfoDto> casting;
    //nullable
    private byte[] image;

}
