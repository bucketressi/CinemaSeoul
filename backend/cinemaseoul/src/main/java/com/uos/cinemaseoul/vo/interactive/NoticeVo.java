package com.uos.cinemaseoul.vo.interactive;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class NoticeVo {
    private int noti_id;
    private int admi_id;
    private String admi_name;
    private String noti_contents;
    private String noti_title;
    private String crea_datetime;
}
