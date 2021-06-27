package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsertMovieDto {

    private String movi_name;
    private String avai_age_code;
    private int run_time;
    //nullable
    private String company;
    //nullable
    private String movi_contents;
    private String open_date;

    //nullable
    private byte[] image;

}
