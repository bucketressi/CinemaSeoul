package com.uos.cinemaseoul.dto.movie.people;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PeopleDetailDto {
    private int peop_id;
    private String peop_name;
    private String nation;
    private String birth;
    private String peop_contents;
    @JsonIgnore
    private byte[] image;
    private String imageBase64;

    List<CastingMovieDto> movies = new ArrayList<>();
}
