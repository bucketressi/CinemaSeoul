package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.dao.user.BlackListDao;
import com.uos.cinemaseoul.vo.user.BlackListVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlackListService {

    private final BlackListDao blackListDao;

    //생성자 주입
    @Autowired
    public BlackListService(BlackListDao blackListDao) {
        this.blackListDao = blackListDao;
    }

    public void addBlackList(BlackListVo vo){
        blackListDao.insert(vo);
    }

    public void deleteBlackList(BlackListVo vo){
        blackListDao.delete(vo);
    }

    public BlackListVo selectBlackList(String phone_num, String blac_name){
        return blackListDao.select(phone_num, blac_name);
    }
}
