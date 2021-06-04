package com.uos.cinemaseoul.dto.interactive.event;

import com.uos.cinemaseoul.common.paging.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventListDto extends PageInfo {
    List<EventShortDto> event_list = new ArrayList<>();
}
