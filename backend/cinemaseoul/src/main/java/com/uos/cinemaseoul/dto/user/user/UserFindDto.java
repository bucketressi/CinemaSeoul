package com.uos.cinemaseoul.dto.user.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserFindDto {
    private String user_name;
    private String phone_num;
    private String email;
    private String password;
}
