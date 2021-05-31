package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.dao.user.BlackListDao;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.vo.user.BlackListVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlackListService {

    private final BlackListDao blackListDao;
    private final UsersDao usersDao;

    public void addBlackList(BlackListVo vo){
        //만약 회원가입된 유저라면 -> 탈퇴시키고 추가
        UsersVo vos = usersDao.findByPhone(vo.getPhone_num());
        if(vos != null) {
            usersDao.deleteUser(vos.getUser_id());
        }
        blackListDao.insert(vo);
    }

    public void deleteBlackList(String phone_num){
        blackListDao.delete(phone_num);
    }

    public List<BlackListVo> getBlackList() {
        return blackListDao.selectList();
    }

    public void updateBlackList(BlackListVo vo) {

        //바꾸는 번호가 이미 회원의 번호이면
        UsersVo vos = usersDao.findByPhone(vo.getPhone_num());
        if(vos != null) {
            throw new DuplicateException("Already in User");
        }
        blackListDao.update(vo);
    }
}
