package com.uos.cinemaseoul.vo.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageVo {

    private String mess_id;
    private String mess_content;
    private String next_mess;

}
