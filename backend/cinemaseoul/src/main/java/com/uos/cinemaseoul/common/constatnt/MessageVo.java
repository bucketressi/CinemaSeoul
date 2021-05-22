package com.uos.cinemaseoul.common.constatnt;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class MessageVo {

    private String mess_id;
    private String mess_content;
    private String next_mess;

}
