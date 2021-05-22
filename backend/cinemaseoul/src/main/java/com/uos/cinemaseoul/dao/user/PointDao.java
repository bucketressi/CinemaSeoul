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
    void plusUserPoint(PointVo vo);
    void minusUserPoint(PointVo vo);

    UsersVo getPoint(int user_id);
    List<PointInfoDto> findPoint(String start_date, int user_id);
}
