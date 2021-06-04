package com.uos.cinemaseoul.common.paging;

import lombok.Getter;

@Getter
public class Criteria {
    private int totalpage;
    private int page;
    private int amount;

    public Criteria(){
        this(1,10); // 1 페이지, 10개 게시글
    }

    public Criteria(int page, int amount) {
        this.page = page;
        if(amount < 1){
            this.amount = 10;
        }
        else{
            this.amount  = amount;
        }
    }

    public void setAmount(int i) {
        this.amount = i;
    }
}
