package com.uos.cinemaseoul.dao.user;

import com.uos.cinemaseoul.vo.user.UsersVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AdminDao {
    UsersVo findByEmail(String email);
    UsersVo findById(int id);
    void signUp(UsersVo usersVo);
}
