package com.uos.cinemaseoul.common.paging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageInfo {
    private int page;
    private int totalpage;
    private int amount;

    public void setPageInfo(int totalPage, int page, int amount) {
        this.totalpage = totalPage;
        this.page = page;
        this.amount = amount;
    }
}
