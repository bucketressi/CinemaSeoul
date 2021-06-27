package com.uos.cinemaseoul.dto.interactive.ask;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class AskDto {

    private int ask_id;
    //ask
    private int user_id;
    private String user_name;
    private String ask_title;
    private String ask_contents;
    //answer
    private int admi_id;
    private String admi_name;
    private String answer;
    //time
    private String crea_datetime;
    private String answ_datetime;

}
