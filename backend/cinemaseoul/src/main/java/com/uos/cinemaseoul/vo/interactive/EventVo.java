package com.uos.cinemaseoul.vo.interactive;


import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class EventVo {
    private int event_id;
    private int admi_id;
    private String event_title;
    private String event_contents;
    private String crea_datetime;
    private byte[] image;
}
