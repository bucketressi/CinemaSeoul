package com.uos.cinemaseoul.dto.user;

import com.uos.cinemaseoul.common.paging.Criteria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminListDto {
    public List<AdminListInfoDto> adminListInfoDtoList = new ArrayList<>();
    private int totalpage;
    private int page;
    private int amount;

    public void setPageInfo(int totalpage, int page, int amount){
        this.totalpage = totalpage;
        this.page = page;
        this.amount = amount;
    }

    public void setAdminListInfoDtoList(List<AdminListInfoDto> list){
        this.adminListInfoDtoList = list;
    }
}
