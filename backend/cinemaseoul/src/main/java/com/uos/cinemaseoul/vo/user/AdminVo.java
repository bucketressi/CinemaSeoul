package com.uos.cinemaseoul.vo.user;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminVo {
    private int admi_id;
    private String admi_name;
    private String birth;
    private String phone_num;
    private String email;
    private String password;
    private int admi_auth_code;
    private String position;
    private String address;
    private String start_date;
}
