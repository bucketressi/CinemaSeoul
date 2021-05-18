package com.uos.cinemaseoul.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminFindDto {
    private String admi_name;
    private String phone_num;
    private String email;
    private String password;
}
