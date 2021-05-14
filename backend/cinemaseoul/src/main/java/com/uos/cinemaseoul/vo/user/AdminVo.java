package com.uos.cinemaseoul.vo.user;

import com.uos.cinemaseoul.dto.user.AdminSignUpDto;
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

    public AdminVo inputSignUp(AdminSignUpDto adminSignUpDto){
        this.admi_name = adminSignUpDto.getAdmi_name();

        if(adminSignUpDto.getBirth() != null){
            this.birth = adminSignUpDto.getBirth();
        }

        this.phone_num = adminSignUpDto.getPhone_num();
        this.email = adminSignUpDto.getEmail();
        this.password = adminSignUpDto.getPassword();
        this.admi_auth_code = adminSignUpDto.getAdmi_auth_code();

        if(adminSignUpDto.getAddress() != null){
            this.position = adminSignUpDto.getPosition();
        }
        if(adminSignUpDto.getAddress() != null){
            this.address = adminSignUpDto.getAddress();
        }
        this.start_date = adminSignUpDto.getStart_date();
        return this;
    }

}
