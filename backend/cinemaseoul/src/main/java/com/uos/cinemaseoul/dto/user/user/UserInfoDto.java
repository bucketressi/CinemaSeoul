package com.uos.cinemaseoul.dto.user.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoDto {
    private int user_id;
    private String user_name;
    private String birth;
    private String phone_num;
    private String email;
    private String password;
    private String agreement;
    private int curr_point;
    private int accu_point;
    private String user_type;
}
