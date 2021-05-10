package com.uos.cinemaseoul.controller.user;

import com.uos.cinemaseoul.common.auth.JwtTokenProvider;
import com.uos.cinemaseoul.dto.user.UsersDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/user")
public class UsersController {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UsersController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    //회원 로그인
    @PostMapping(value = "/login")
    public void login(@RequestBody UsersDto.LoginDto logindto){
    }


}
