package com.uos.cinemaseoul.dao;

import com.uos.cinemaseoul.vo.BlackListVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BlackListDao {
    void insert(BlackListVo vo);
    void delete(BlackListVo vo);
    BlackListVo select(String name);
}
