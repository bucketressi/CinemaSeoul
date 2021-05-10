package com.uos.cinemaseoul.vo.user;

import com.uos.cinemaseoul.dto.user.UsersDto;
import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsersVo {
    private int user_id;
    private String user_name;
    private String birth;
    private String phone_num;
    private String email;
    private String password;
    private String agreement;
    private int curr_point;
    private int accu_point;
    private int user_type_code;
    private int user_auth_code;

    //비회원용 생성자
    public UsersVo(int user_id, String user_name, String birth, String phone_num,String password, int user_type_code, int user_auth_code){
        this.user_id = user_id;
        this.user_name = user_name;
        this.birth = birth;
        this.phone_num = phone_num;
        this.password = password;
        this.user_type_code = user_type_code;
        this.user_auth_code = user_auth_code;
    }

    public UsersVo inputSignUp (UsersDto.SignupDto signupDto){
        this.user_name = signupDto.getUser_name();
        this.birth = signupDto.getBirth();
        this.phone_num = signupDto.getPhone_num();
        this.email = signupDto.getEmail();
        this.password = signupDto.getPassword();
        this.agreement = signupDto.getAgreement();
        //회원
        this.user_auth_code = 1;
        return this;
    }
}
