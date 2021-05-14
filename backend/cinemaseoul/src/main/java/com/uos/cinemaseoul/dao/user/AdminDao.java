package com.uos.cinemaseoul.dao.user;

import com.uos.cinemaseoul.dto.user.AdminInfoDto;
import com.uos.cinemaseoul.vo.user.AdminVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AdminDao {
    AdminVo findByEmail(String email);
    AdminVo findByPhone(String phone);
    AdminVo findById(int admi_id);
    AdminVo findByEmailAndPhone(String email, String phone_num);

    void signUp(AdminVo adminVo);
    AdminInfoDto selectAdmin(int admi_id);
    int updateAdmin(AdminVo adminVo);
    int deleteAdmin(int admi_id);
}
