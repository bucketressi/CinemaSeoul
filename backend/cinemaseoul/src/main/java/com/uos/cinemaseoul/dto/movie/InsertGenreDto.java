package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InsertGenreDto {
    private int movi_id;
    private int[] genre_code;
}
