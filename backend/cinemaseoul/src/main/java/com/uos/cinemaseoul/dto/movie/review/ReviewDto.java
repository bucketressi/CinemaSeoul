package com.uos.cinemaseoul.dto.movie.review;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewDto {
    private int user_id;
    private int movi_id;
    private int rating;
    private String comments;
}
