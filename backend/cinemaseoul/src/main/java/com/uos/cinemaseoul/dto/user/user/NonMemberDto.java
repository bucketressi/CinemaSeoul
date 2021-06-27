package com.uos.cinemaseoul.dto.user.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NonMemberDto{
    String user_name;
    String birth;
    String phone_num;
    String password;
    String agreement;
    public void encodePassword(String newPass){
        this.password = newPass;
    }
}
