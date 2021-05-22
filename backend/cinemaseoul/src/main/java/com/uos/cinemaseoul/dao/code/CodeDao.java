package com.uos.cinemaseoul.dao.code;

import com.uos.cinemaseoul.common.constatnt.CodeVo;
import com.uos.cinemaseoul.common.constatnt.MessageVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface CodeDao {

    List<MessageVo> getMessage();
    List<CodeVo> getCode();
}
