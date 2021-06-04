package com.uos.cinemaseoul.dto.interactive.ask;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AskShortDto {
    private int ask_id;
    private String user_name;
    private String ask_title;
    private String crea_datetime;

    private String admi_name;
    private String answ_datetime;
}
