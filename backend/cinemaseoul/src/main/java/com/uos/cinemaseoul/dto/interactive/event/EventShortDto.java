package com.uos.cinemaseoul.dto.interactive.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventShortDto {
    private int event_id;
    private String admi_name;
    private String event_title;
    private String crea_datetime;
}
