package com.uos.cinemaseoul.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieListDto {
    private List<MovieListInfoDto> movi_list = new ArrayList<>();
    private int page;
    private int totalpage;
    private int amount;

    public void setPageInfo(int totalPage, int page, int amount) {
        this.totalpage = totalPage;
        this.page = page;
        this.amount = amount;
    }
}
