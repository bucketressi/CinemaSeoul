package com.uos.cinemaseoul.dto.movie.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private int user_id;
    private int movi_id;
    private int rating;
    private String comments;
}
