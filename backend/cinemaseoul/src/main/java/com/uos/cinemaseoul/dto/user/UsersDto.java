package com.uos.cinemaseoul.dto.user;

import lombok.*;

public class UsersDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginDto{
        String email;
        String password;
    }

    @Getter @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignupDto{
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

    public static class NonMemberDto{
        String user_name;
        String phone_num;
        String password;
        String agreement;
    }
}
