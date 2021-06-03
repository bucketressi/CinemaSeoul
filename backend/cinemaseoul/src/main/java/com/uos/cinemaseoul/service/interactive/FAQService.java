package com.uos.cinemaseoul.service.interactive;

import com.uos.cinemaseoul.common.mapper.FAQMapper;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dao.interactive.FAQDao;
import com.uos.cinemaseoul.dto.interactive.FAQDto;
import com.uos.cinemaseoul.dto.interactive.FAQListDto;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.vo.interactive.FAQVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FAQService {

    private final FAQDao faqDao;
    private final FAQMapper faqMapper;

    @Transactional
    public void addFAQ(FAQDto faqDto) {
        faqDao.insertFAQ(faqMapper.insertIntoFAQVoByFAQDto(faqDto));
    }

    @Transactional
    public void updateFAQ(FAQDto faqDto) {
        if( faqDao.updateFAQ(faqMapper.insertIntoFAQVoByFAQDto(faqDto)) != 1){
            throw new NotFoundException("Not Found");
        }
    }

    @Transactional
    public void deleteFAQ(int faq_id){
        if(faqDao.deleteFAQ(faq_id) != 1){
            throw new NotFoundException("Not Found");
        }
    }

    @Transactional
    public FAQListDto getFAQList(Criteria criteria) {

        FAQListDto faqListDto = new FAQListDto();

        //페이지 계산
        criteria.setAmount(20);
        int totalCount = faqDao.countList();
        int totalPage =  totalCount / criteria.getAmount();
        if(totalCount % criteria.getAmount() > 0){
            totalPage++;
        }

        //total page
        faqListDto.setPageInfo(totalPage, criteria.getPage(), criteria.getAmount());
        faqListDto.setFaq_lists(faqDao.selectFAQList(criteria).stream().map( o -> faqMapper.insertIntoFAQDtoByFAQVo(o))
                .collect(Collectors.toList()));

        return faqListDto;
    }

    @Transactional
    public FAQDto getFAQ(int faq_id){
        FAQVo vo = faqDao.selectFAQ(faq_id);
        if(vo == null){
            throw new NotFoundException("Not Founded FAQ");
        }
        return faqMapper.insertIntoFAQDtoByFAQVo(vo);
    }
}
