package com.uos.cinemaseoul.dto.movie.people;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PeopleDto {
    private int peop_id;
    private String peop_name;
    private String nation;
    private String birth;
    private String peop_contents;
    private byte[] image;
}
