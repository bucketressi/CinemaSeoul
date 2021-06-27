package com.uos.cinemaseoul.dao.user;

import com.uos.cinemaseoul.vo.user.BlackListVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface BlackListDao {
    void insert(BlackListVo vo);
    void delete(String phone_num);

    //특정 블랙리스트 조회
    BlackListVo select(String phone_num);

    //조회
    List<BlackListVo> selectList();

    //수정
    void update(BlackListVo vo);
}
