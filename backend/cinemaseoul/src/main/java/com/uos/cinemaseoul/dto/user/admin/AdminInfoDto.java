package com.uos.cinemaseoul.dto.user.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class AdminInfoDto {
    private int admi_id;
    private String admi_name;
    private String birth;
    private String phone_num;
    private String email;
    private String password;
    private String position;
    private String address;
    private String start_date;
    private String admi_auth;
}
