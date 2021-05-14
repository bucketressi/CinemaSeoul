package com.uos.cinemaseoul.common.paging;

import lombok.Getter;

@Getter
public class Criteria {
    private int totalpage;
    private int page;
    private int amount = 10;

    public Criteria(){
        this(1,10); // 1 페이지, 10개 게시글
    }

    public Criteria(int page, int amount) {
        this.page = page;
        this.amount = amount;
    }

}
