package com.uos.cinemaseoul.dto.interactive.ask;

import com.uos.cinemaseoul.common.paging.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AskListDto extends PageInfo {
    List<AskShortDto> ask_lists = new ArrayList<>();
}
