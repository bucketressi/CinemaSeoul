package com.uos.cinemaseoul.service;

import com.uos.cinemaseoul.dao.BlackListDao;

import com.uos.cinemaseoul.vo.BlackListVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class BlackListServiceTest {

    @Autowired
    BlackListService blackListService;

    @Test
    public void 블랙리스트등록_삭제() throws Exception{
        BlackListVo givenVo = new BlackListVo("김현동", "01012345678", "20001010");

        //given
        blackListService.addBlackList(givenVo);

        //when
        BlackListVo selectVo = blackListService.selectBlackList("김현동");

        //then
        assertEquals(givenVo.getBlac_name(),selectVo.getBlac_name());
        blackListService.deleteBlackList(selectVo);
    }
}