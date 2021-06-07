package com.uos.cinemaseoul.dto.interactive.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private int event_id;
    private int admi_id;
    private String event_title;
    private String event_contents;
    private String crea_datetime;
    @JsonIgnore
    private byte[] image;
    private String imageBase64;
}
