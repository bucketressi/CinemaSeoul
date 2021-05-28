package com.uos.cinemaseoul.dto.book.hall;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HallInfoDto {
    private List<SeatDto> seats = new ArrayList<>();
}
