package com.uos.cinemaseoul.service.interactive;

import com.uos.cinemaseoul.common.mapper.AskMapper;
import com.uos.cinemaseoul.common.paging.AskCriteria;
import com.uos.cinemaseoul.dao.interactive.AskDao;
import com.uos.cinemaseoul.dto.interactive.ask.AskDto;
import com.uos.cinemaseoul.dto.interactive.ask.AskListDto;
import com.uos.cinemaseoul.dto.interactive.ask.AskShortDto;
import com.uos.cinemaseoul.dto.interactive.faq.FAQShortDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.interactive.AskVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AskService {
    private final AskDao askDao;
    private final AskMapper askMapper;
    @Transactional
    public void addAsks(AskDto askDto) {
        askDao.insertAsk(askMapper.insertIntoVoFromDto(askDto));
    }

    @Transactional
    public void updateAsks(AskDto askDto) {
        if(askDao.selectAsk(askDto.getAsk_id()).getAnsw_datetime() != null){
            throw new DuplicateException("이미 답변 된 문의사항입니다.");
        }
        if(askDao.updateAsk(askMapper.insertIntoVoFromDto(askDto)) > 1){
            throw new WrongArgException("너무 많이 업데이트되었습니다.");
        };
    }

    @Transactional
    public void deleteAsks(int ask_id) {
        if(askDao.deleteAsk(ask_id) != 1){
            throw new WrongArgException("너무 많이 삭제");
        }
    }

    @Transactional
    public void answerAsks(AskDto askDto) {
        askDao.answerAsk(askMapper.insertIntoVoFromDto(askDto));
    }

    @Transactional
    public AskListDto getAskList(AskCriteria askCriteria) {
        AskListDto askListDto = new AskListDto();

        //페이지 계산
        askCriteria.setAmount(20);
        int totalCount = askDao.countList(askCriteria);
        int totalPage =  totalCount / askCriteria.getAmount();
        if(totalCount % askCriteria.getAmount() > 0){
            totalPage++;
        }

        //total page
        askListDto.setPageInfo(totalPage, askCriteria.getPage(), askCriteria.getAmount());
        askListDto.setAsk_lists(askDao.selectAskList(askCriteria).stream()
                .map( o -> askMapper.insertIntoShortDtoFromVo(o))
                .collect(Collectors.toList()));

        return askListDto;
    }

    @Transactional
    public AskDto getAsk(int ask_id) {
        AskVo vo = askDao.selectAsk(ask_id);
        if(vo == null){
            throw new NotFoundException("Not Founded FAQ");
        }
        return askMapper.insertIntoDtoFromVo(vo);
    }

}
