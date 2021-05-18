package com.uos.cinemaseoul.dao.user;

import com.uos.cinemaseoul.dto.user.UserInfoDto;
import com.uos.cinemaseoul.vo.user.UsersVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UsersDao {
    UsersVo findByEmail(String email);
    UsersVo findById(int user_id);
    UsersVo findByPhone(String phone_num);
    String findByPhoneAndName(UsersVo vo);
    String findByEmailAndPhone(String email, String phone_num);

    int signUp(UsersVo usersVo);
    void nonMemberSignUp(UsersVo usersVo);
    void nonMemberUpgrade(UsersVo vo);

    UserInfoDto selectById(int user_id);
    int updateUser(UsersVo usr);
    int deleteUser(int user_id);
    String adultCheck(String phone_num);



    Integer resetPassword(UsersVo vo);
}
