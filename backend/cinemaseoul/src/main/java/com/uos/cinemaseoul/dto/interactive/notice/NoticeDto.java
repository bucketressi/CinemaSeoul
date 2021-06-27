package com.uos.cinemaseoul.dto.interactive.notice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDto {
    private int noti_id;
    private int admi_id;
    private String admi_name;
    private String noti_contents;
    private String noti_title;
    private String crea_datetime;
}
