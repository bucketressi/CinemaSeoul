package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dao.user.AdminDao;
import com.uos.cinemaseoul.dto.user.admin.AdminInfoDto;
import com.uos.cinemaseoul.dto.user.admin.AdminListDto;
import com.uos.cinemaseoul.dto.user.admin.AdminSignUpDto;
import com.uos.cinemaseoul.service.admin.AdminService;
import com.uos.cinemaseoul.vo.admin.AdminVo;
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
public class AdminServiceTest {

    @Autowired
    AdminDao adminDao;
    @Autowired
    AdminService adminService;

    @Test
    public void 관리자_등록_수정_삭제() throws Exception{
        //given
        AdminSignUpDto adminSignUpDto = new AdminSignUpDto("관1",null,"12312345678","admin@test.com","1234",
                "120001","직원",null,"20200101");
        adminService.signUp(adminSignUpDto);

        //when
        AdminVo vo1 = new AdminVo().inputSignUp(adminSignUpDto);
        AdminVo vo2 = adminDao.findByEmailAndPhone(vo1.getEmail(), vo1.getPhone_num());
        AdminInfoDto ivo = adminDao.selectAdmin(vo2.getAdmi_id());

        //Test1
        assertEquals(vo1.getAdmi_name(), ivo.getAdmi_name());

        vo1.setPhone_num("32112345678");
        vo1.setAdmi_id(vo2.getAdmi_id());

        adminService.updateAdmin(vo1);
        vo2 = adminDao.findByEmail(vo1.getEmail());

        //Test2
        assertEquals(vo1.getPhone_num(), vo2.getPhone_num());

        adminService.deleteAdmin(vo2.getAdmi_id());
    }

    @Test
    public void 페이지() throws Exception{
        //given
        Criteria criteria = new Criteria(2,5);
        for(int i =1; i<23; i++){
            adminService.signUp(new AdminSignUpDto("관"+i,null,"123123456"+i,"admin@test.com"+i,"1234",
                    "120001","직원",null,"20200101"));
        }

        //when
        AdminListDto infoDto = adminService.selectList(criteria);

        //then
        assertEquals(infoDto.getTotalpage(),5);
        assertEquals(infoDto.getAdminListInfoDtoList().size(),5);
        assertEquals(infoDto.getAdminListInfoDtoList().get(0).getAdmi_name(),"관6");
    }
}