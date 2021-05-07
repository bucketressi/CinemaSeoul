package com.uos.cinemaseoul.service;

import com.uos.cinemaseoul.dao.BlackListDao;
import com.uos.cinemaseoul.vo.BlackListVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BlackListService {
    @Autowired
    BlackListDao blackListDao;

    public void addBlackList(BlackListVo vo){
        blackListDao.insert(vo);
    }

    public void deleteBlackList(BlackListVo vo){
        blackListDao.delete(vo);
    }

    public BlackListVo selectBlackList(String name){
        return blackListDao.select(name);
    }
}
