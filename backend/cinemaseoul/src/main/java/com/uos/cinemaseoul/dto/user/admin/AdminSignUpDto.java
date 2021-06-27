package com.uos.cinemaseoul.dto.user.admin;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminSignUpDto {
    private String admi_name;
    private String birth;
    private String phone_num;
    private String email;
    private String password;
    private String admi_auth_code = "120001";
    private String position;
    private String address;
    private String start_date;

    public void encodePassword(String newPass){
        this.password = newPass;
    }
}
