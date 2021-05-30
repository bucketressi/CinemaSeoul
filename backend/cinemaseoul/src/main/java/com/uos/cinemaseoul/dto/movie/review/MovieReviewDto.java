package com.uos.cinemaseoul.dto.movie.review;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class MovieReviewDto {
    private String commnets;
    private Integer rating;
    private int movi_id;
    private String movi_name;
    private byte[] images;
}
