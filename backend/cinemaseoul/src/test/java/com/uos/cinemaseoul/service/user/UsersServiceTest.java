package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.controller.user.UsersController;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.dto.user.LoginDto;
import com.uos.cinemaseoul.dto.user.NonMemberDto;
import com.uos.cinemaseoul.dto.user.SignUpDto;
import com.uos.cinemaseoul.dto.user.UserInfoDto;
import com.uos.cinemaseoul.vo.user.UsersVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class UsersServiceTest {

    @Autowired
    UsersDao usersDao;
    @Autowired
    UsersService usersService;

    @Test
    public void 비회원_로그인() throws Exception{

        //given
        NonMemberDto nonMemberDto = new NonMemberDto("김", "14440404", "01011111111", "1234", "1");

        //t1
        assertNull(usersService.nonMemberCheck(nonMemberDto.getPhone_num()));

        //t2
        AuthUser u2 = usersService.nonMemberSignUp(nonMemberDto);
        UsersVo usr = usersDao.findByPhone(nonMemberDto.getPhone_num());
        assertEquals(u2.getId(), usr.getUser_id());
    }

    @Test
    public void 회원_수정_삭제() throws Exception{
        //given
        SignUpDto signupDto = new SignUpDto("김","19990909","01011111111","user1","1234","1");
        int id = usersService.signUp(signupDto);
        System.out.println("id" + id);
        UserInfoDto u1 = usersService.selectById(id);


        //when
        UsersVo v1 = new UsersVo().inputSignUp(signupDto);
        v1.setUser_name("박");
        usersService.updateUser(v1);
        UsersVo v2 = usersDao.findByPhone(v1.getPhone_num());

        usersService.deleteUser(id);
        UserInfoDto u2 = usersService.selectById(id);

        //then
        assertNotEquals(u1.getUser_name(), v2.getUser_name());
        assertNull(u2);
    }
}