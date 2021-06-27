package com.uos.cinemaseoul.dao.user;

import com.uos.cinemaseoul.controller.user.PointController;
import com.uos.cinemaseoul.dto.user.point.PointInfoDto;
import com.uos.cinemaseoul.vo.user.PointVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface PointDao {

    //포인트업데이트
    void updatePoint(PointVo vo);
    //적립
    void plusUserPoint(PointVo vo);
    //차감
    void minusUserPoint(PointVo vo);
    //사용취소
    void returnUserUsePoint(PointVo pointVo);
    //적립취소
    void returnUserAddPoint(PointVo pointVo);

    //사용자 등급
    String getUserCode(int user_id);

    UsersVo getPoint(int user_id);
    List<PointInfoDto> findPoint(String start_date, int user_id);



}
