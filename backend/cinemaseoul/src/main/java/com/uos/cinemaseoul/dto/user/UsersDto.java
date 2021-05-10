package com.uos.cinemaseoul.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class UsersDto {

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginDto{
        String email;
        String password;
    }

    public class SignupDto{
        String userName;
        String birth;
        String phoneNum;
        String email;
        String password;
        String agreement;
    }

    public class NonMemberDto{
        String userName;
        String phoneNum;
        String password;
        String agreement;
    }
}
