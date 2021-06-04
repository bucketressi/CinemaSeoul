package com.uos.cinemaseoul.dao.interactive;

import com.uos.cinemaseoul.common.paging.AskCriteria;
import com.uos.cinemaseoul.vo.interactive.AskVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface AskDao {
    void insertAsk(AskVo insertIntoVoFromDto);
    AskVo selectAsk(int ask_id);
    int updateAsk(AskVo insertIntoVoFromDto);
    int deleteAsk(int ask_id);

    void answerAsk(AskVo insertIntoVoFromDto);

    List<AskVo> selectAskList(AskCriteria askCriteria);
    int countList(AskCriteria askCriteria);
}
