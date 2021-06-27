package com.uos.cinemaseoul.service.interactive;

import com.uos.cinemaseoul.common.mapper.NoticeMapper;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dao.interactive.NoticeDao;
import com.uos.cinemaseoul.dto.interactive.faq.FAQShortDto;
import com.uos.cinemaseoul.dto.interactive.notice.NoticeDto;
import com.uos.cinemaseoul.dto.interactive.notice.NoticeListDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.interactive.NoticeVo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.relational.core.sql.Not;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeDao noticeDao;
    private final NoticeMapper noticeMapper;

    @Transactional
    public void addNotice(NoticeDto noticeDto) {
        noticeDao.insertNotice(noticeMapper.insertIntoVoFromDto(noticeDto));
    }

    @Transactional
    public void updateNotice(NoticeDto noticeDto) {
        if(noticeDao.updateNotice(noticeMapper.insertIntoVoFromDto(noticeDto)) != 1){
            throw new WrongArgException("Wrong Args");
        }
    }

    @Transactional
    public void deleteNotice(int noti_id) {
        if(noticeDao.deleteNotice(noti_id) != 1){
            throw new WrongArgException("WrongArgs");
        }
    }

    @Transactional
    public NoticeListDto getNoticeList(Criteria criteria) {
        NoticeListDto noticeListDto = new NoticeListDto();
        //페이지 계산
        criteria.setAmount(20);
        int totalCount = noticeDao.countList();
        int totalPage =  totalCount / criteria.getAmount();
        if(totalCount % criteria.getAmount() > 0){
            totalPage++;
        }

        //total page
        noticeListDto.setPageInfo(totalPage, criteria.getPage(), criteria.getAmount());
        noticeListDto.setNoti_list(noticeDao.selectNoticeList(criteria).stream()
                .map(o ->  noticeMapper.insertIntoShortFromVo(o))
                .collect(Collectors.toList()));

        return noticeListDto;
    }


    @Transactional
    public NoticeDto getNotice(int noti_id) {
        NoticeVo vo = noticeDao.selectNotice(noti_id);
        if(vo == null){
            throw new NotFoundException("Not Found Notice");
        }
        return noticeMapper.insertIntoDtoFromVo(vo);
    }
}
