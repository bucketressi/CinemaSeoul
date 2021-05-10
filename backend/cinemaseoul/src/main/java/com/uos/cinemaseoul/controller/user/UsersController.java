package com.uos.cinemaseoul.controller.user;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.JwtTokenProvider;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.dto.user.UsersDto;
import com.uos.cinemaseoul.exception.BlackListException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.service.user.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/test")
    public void forMember(){
        System.out.println("이건 멤버용");
    }

    @PostMapping(value = "/test2")
    public void forNonMember(){
        System.out.println("이건 비회원용");
    }

    //회원 로그인
    @PostMapping(value = "/login")
    public String login(@RequestBody UsersDto.LoginDto logindto){
        AuthUser authUser = usersService.login(logindto);

        if(authUser == null){
            throw new NotFoundException("ID not found");
        }else if(!passwordEncoder.matches(logindto.getPassword(), authUser.getPassword())){
            throw new WrongArgException("Wrong Password");
        }
        return jwtTokenProvider.createToken(UserType.USERS.toString(), authUser.getUsername(), authUser.getAuth());
    }

    //회원가입
    @PostMapping("/signup")
    public void signup(@RequestBody UsersDto.SignupDto signupDto) {
        System.out.println("signupDto = " + signupDto.getUser_name());
        try{
            // 비밀번호 인코딩
            signupDto.encodePassword(passwordEncoder.encode(signupDto.getPassword()));
            usersService.signUp(signupDto);
        }
        //블랙리스트면
        catch (BlackListException e){
            throw e;
        }
        //그외 예외
        catch (Exception e){
            e.printStackTrace();
            throw new WrongArgException("Wrong SignUp Form");
        }
    }


}
