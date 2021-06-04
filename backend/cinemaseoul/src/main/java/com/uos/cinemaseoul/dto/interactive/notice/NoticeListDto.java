package com.uos.cinemaseoul.dto.interactive.notice;

import com.uos.cinemaseoul.common.paging.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticeListDto extends PageInfo {
    List<NoticeShortDto> noti_list = new ArrayList<>();
}
