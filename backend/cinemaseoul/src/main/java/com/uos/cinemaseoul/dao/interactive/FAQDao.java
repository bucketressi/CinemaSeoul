package com.uos.cinemaseoul.dao.interactive;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.vo.interactive.FAQVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface FAQDao {

    void insertFAQ(FAQVo vo);
    int updateFAQ(FAQVo vo);
    int deleteFAQ(int faq_id);

    int countList();
    List<FAQVo> selectFAQList(Criteria criteria);

    FAQVo selectFAQ(int faq_id);
}
