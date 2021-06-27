package com.uos.cinemaseoul.vo.movie;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class ReviewVo {
    private int user_id;
    private int movi_id;
    private int rating;
    private String comments;
}
