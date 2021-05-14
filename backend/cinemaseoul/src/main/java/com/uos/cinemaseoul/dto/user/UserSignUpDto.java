package com.uos.cinemaseoul.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUpDto {
    String user_name;
    String birth;
    String phone_num;
    String email;
    String password;
    String agreement;

    public void encodePassword(String newPass){
        this.password = newPass;
    }
}