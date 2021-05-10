package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.dto.user.UsersDto;
import com.uos.cinemaseoul.vo.user.UsersVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class UsersServiceTest {
    @Autowired
    UsersDao usersDao;

    @Test
    public void 회원_저장_조회() throws Exception{
        //given
        UsersDto.SignupDto signupDto = new UsersDto.SignupDto("김","19990909","01012345678","user1","1234","1");
        usersDao.signUp(new UsersVo().inputSignUp(signupDto));
        //when
        UsersVo vo2 = usersDao.findByEmail(signupDto.getEmail());

        //then
        assertEquals(vo2.getEmail(),signupDto.getEmail());
    }
}