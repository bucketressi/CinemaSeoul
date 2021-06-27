package com.uos.cinemaseoul.dto.book.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.quartz.QuartzDataSource;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookListDto {
    private List<BookListInfoDto> bookrecord_list = new ArrayList<>();
    private int page;
    private int amount;
    private int totalpage;

    public void setPageInfo(int totalPage, int page, int amount) {
        this.totalpage = totalPage;
        this.page = page;
        this.amount = amount;
    }
}
