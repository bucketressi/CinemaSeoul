package com.uos.cinemaseoul.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminSignUpDto {
    private String admi_name;
    private String birth;
    private String phone_num;
    private String email;
    private String password;
    private int admi_auth_code = 120001;
    private String position;
    private String address;
    private String start_date;

    public void encodePassword(String newPass){
        this.password = newPass;
    }
}
