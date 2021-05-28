package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.NonNull;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class UpdateMovieDto {
    private int movi_id;
    @NonNull
    private String movi_name;
    @NonNull
    private String avai_age_code;
    @NonNull
    private int run_time;
    //nullable
    private String company;
    //nullable
    private String movi_contents;
    @NonNull
    private String open_date;
}
