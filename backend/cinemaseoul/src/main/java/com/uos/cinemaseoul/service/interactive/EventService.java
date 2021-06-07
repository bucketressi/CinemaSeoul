package com.uos.cinemaseoul.service.interactive;

import com.uos.cinemaseoul.common.mapper.EventMapper;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dao.interactive.EventDao;
import com.uos.cinemaseoul.dto.interactive.event.EventDto;
import com.uos.cinemaseoul.dto.interactive.event.EventListDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.vo.interactive.EventVo;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventDao eventDao;
    private final EventMapper eventMapper;

    @Transactional
    public void addEvent(EventDto eventDto) {
        eventDao.insertEvent(eventMapper.insertIntoVoFromDto(eventDto));
    }

    @Transactional
    public void updateEvent(EventDto eventDto) {
       if(eventDao.updateEvent(eventMapper.insertIntoVoFromDto(eventDto)) != 1 ){
           throw new DuplicateException("Not Found");
       };
    }

    @Transactional
    public void updateEventImage(EventDto eventDto) {
        if(eventDao.updateEventImage(eventMapper.insertIntoVoFromDto(eventDto)) != 1){
            throw new DuplicateException("Not Found");
        }
    }

    @Transactional
    public void deleteEvent(int event_id) {
        if(eventDao.deleteEvent(event_id) != 1){
            throw new DuplicateException("Not Found");
        }
    }
    @Transactional
    public EventListDto getEventList(Criteria criteria) {
        EventListDto eventListDto = new EventListDto();
        //페이지 계산
        criteria.setAmount(20);
        int totalCount = eventDao.countList();
        int totalPage =  totalCount / criteria.getAmount();
        if(totalCount % criteria.getAmount() > 0){
            totalPage++;
        }

        //total page
        eventListDto.setPageInfo(totalPage, criteria.getPage(), criteria.getAmount());
        eventListDto.setEvent_list(eventDao.selectEventList(criteria).stream()
                .map( o -> eventMapper.insertShortDtoFromVo(o))
                .collect(Collectors.toList()));

        return eventListDto;
    }

    public EventDto getEvent(int event_id) {
        EventVo eventVo = eventDao.selectEvent(event_id);

        if(eventVo == null){
            throw new NotFoundException("Not Found Event");
        }

        EventDto eventDto = eventMapper.insertIntoDtoFromVo(eventVo);
        eventDto.setImageBase64(Base64.encodeBase64String(eventDto.getImage()));

        return eventDto;
    }
}
