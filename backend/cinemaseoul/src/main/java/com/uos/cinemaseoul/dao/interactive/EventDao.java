package com.uos.cinemaseoul.dao.interactive;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.interactive.event.EventDto;
import com.uos.cinemaseoul.dto.interactive.event.EventShortDto;
import com.uos.cinemaseoul.vo.interactive.EventVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
@Mapper
public interface EventDao {

    void insertEvent(EventVo insertIntoVoFromDto);

    int updateEvent(EventVo insertIntoVoFromDto);
    int updateEventImage(EventVo insertIntoVoFromDto);

    int deleteEvent(int event_id);

    int countList();
    List<EventVo> selectEventList(Criteria criteria);

    EventVo selectEvent(int event_id);
}
