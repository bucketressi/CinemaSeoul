package com.uos.cinemaseoul.dao.interactive;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.vo.interactive.NoticeVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface NoticeDao {

    void insertNotice(NoticeVo insertIntoVoFromDto);
    int updateNotice(NoticeVo insertIntoVoFromDto);
    int deleteNotice(int noti_id);

    int countList();

    List<NoticeVo> selectNoticeList(Criteria criteria);

    NoticeVo selectNotice(int noti_id);
}
