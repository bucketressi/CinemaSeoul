package com.uos.cinemaseoul.vo.user;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.dto.user.user.UserSignUpDto;
import lombok.*;

@Getter @Setter
@ToString
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
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
    private String user_type_code;
    private String user_auth_code;

    //비회원용 생성자
    public UsersVo(String user_name, String birth, String phone_num,String password, String user_type_code, String user_auth_code){
        this.user_name = user_name;
        this.birth = birth;
        this.phone_num = phone_num;
        this.password = password;
        this.user_type_code = user_type_code;
        this.user_auth_code = user_auth_code;
    }

    public UsersVo inputSignUp (UserSignUpDto userSignupDto){
        this.user_name = userSignupDto.getUser_name();
        this.birth = userSignupDto.getBirth();
        this.phone_num = userSignupDto.getPhone_num();
        this.email = userSignupDto.getEmail();
        this.password = userSignupDto.getPassword();
        this.agreement = userSignupDto.getAgreement();
        this.accu_point = 0;
        //회원
        this.user_auth_code = ConstantTable.USER_AUTH_MEMBER;
        return this;
    }
}
