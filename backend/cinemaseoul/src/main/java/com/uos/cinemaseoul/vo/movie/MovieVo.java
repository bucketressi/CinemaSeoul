package com.uos.cinemaseoul.vo.movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class MovieVo {
    private int movi_id;
    private String movi_name;
    private String avai_age_code;
    private String show_time;
    //nullable
    private String company;
    //nullable
    private String movi_contents;
    private String open_date;
    private float rating;
    //nullable
    private byte[] image;
}
