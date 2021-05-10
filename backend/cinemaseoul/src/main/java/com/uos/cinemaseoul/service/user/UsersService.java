package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.auth.UserToken;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.dto.user.UsersDto;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UsersService {

    private final UsersDao usersDao;

    @Autowired
    public UsersService(UsersDao usersDao) {
        this.usersDao = usersDao;
    }

    //사용자의 로그인
    public UserToken login(UsersDto.LoginDto loginDto) {
        //이메일로 찾고
        //있으면 세팅해서 넘기기
        Optional<> usr = userRepository.findByEmail(ldto.getEmail());
        if (usr.isPresent()) {
            return usertokenDTO.builder()
                    .id(usr.get().getId())
                    .type(usr.get().getType())
                    .password(usr.get().getPassword()).build();
        }
        return null;
    }
}
