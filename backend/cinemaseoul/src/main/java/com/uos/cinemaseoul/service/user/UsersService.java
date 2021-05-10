package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.dao.user.AdminDao;
import com.uos.cinemaseoul.dao.user.BlackListDao;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.dto.user.UsersDto;
import com.uos.cinemaseoul.exception.BlackListException;
import com.uos.cinemaseoul.vo.user.UsersVo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UsersService  {

    private final UsersDao usersDao;
    private final BlackListDao blackListDao;

    //로그인
    public AuthUser login(UsersDto.LoginDto loginDto) {
        AuthUser auth = new AuthUser();
        //이메일로 찾고
        UsersVo usr = usersDao.findByEmail(loginDto.getEmail());
        if (usr != null) {
            //있으면 세팅해서 넘기기
            return new AuthUser(usr.getUser_id(),UserType.USERS,usr.getUser_auth_code(), usr.getPassword());
        }
        return null;
    }

    //회원가입
    @Transactional(rollbackFor = Exception.class)
    public void signUp(UsersDto.SignupDto signupDto) throws Exception{
        //아이디, 번호 중복 한번 더 검사

        //블랙리스트인지 확인
        if(blackListDao.select(signupDto.getPhone_num(), signupDto.getUser_name()) != null){
             throw new BlackListException("black list");
        }
        //회원가입
        usersDao.signUp(new UsersVo().inputSignUp(signupDto));
    }
}
