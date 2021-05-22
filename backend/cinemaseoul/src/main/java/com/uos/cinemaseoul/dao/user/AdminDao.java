package com.uos.cinemaseoul.dao.user;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.user.admin.AdminInfoDto;
import com.uos.cinemaseoul.dto.user.admin.AdminListInfoDto;
import com.uos.cinemaseoul.vo.admin.AdminVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface AdminDao {
    AdminVo findByEmail(String email);
    AdminVo findByPhone(String phone);
    AdminVo findById(int admi_id);
    AdminVo findByEmailAndPhone(String email, String phone_num);

    void signUp(AdminVo adminVo);
    AdminInfoDto selectAdmin(int admi_id);
    List<AdminListInfoDto> selectAdminList(Criteria criteria);
    int countList();

    int updateAdmin(AdminVo adminVo);
    int deleteAdmin(int admi_id);

    String findByPhoneAndName(AdminVo adminVo);
    int resetPassword(AdminVo adminVo);
}
