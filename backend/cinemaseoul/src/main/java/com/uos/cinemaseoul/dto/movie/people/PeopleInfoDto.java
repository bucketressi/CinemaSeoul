package com.uos.cinemaseoul.dto.movie.people;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class PeopleInfoDto {
    private int peop_id;
    private String peop_name;
}
