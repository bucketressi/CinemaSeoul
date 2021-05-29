package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.mapper.PointMapper;
import com.uos.cinemaseoul.controller.user.PointController;
import com.uos.cinemaseoul.dao.user.PointDao;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.dto.user.point.PointInfoDto;
import com.uos.cinemaseoul.dto.user.point.PointListDto;
import com.uos.cinemaseoul.dto.user.point.PointUpdateDto;
import com.uos.cinemaseoul.vo.user.PointVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.uos.cinemaseoul.common.constatnt.ConstantTable.POINT_CODE_ADD;
import static com.uos.cinemaseoul.common.constatnt.ConstantTable.POINT_CODE_USE;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointDao pointDao;
    private final PointMapper pointMapper;

    @Transactional
    public void updatePoint(PointUpdateDto pointUpdateDto) {
        PointVo vo = pointMapper.insertIntoPointVoFromPointUpdateDto(pointUpdateDto);

        pointDao.updatePoint(vo);

        //사용
        if(vo.getPoin_type_code().equals(ConstantTable.POINT_CODE_NOTADD)
                || vo.getPoin_type_code().equals(POINT_CODE_USE)){
            System.out.println(POINT_CODE_USE + " " + POINT_CODE_ADD + " " + vo.getPoin_type_code());
            pointDao.minusUserPoint(vo);
        }
        else{
            pointDao.plusUserPoint(vo);
        }
    }


    @Transactional
    public PointListDto findPoint(String start_date, int user_id){
        PointListDto pointListDto = new PointListDto();
        UsersVo vo = pointDao.getPoint(user_id);

        pointListDto.setPoint(pointDao.findPoint(start_date, user_id));
        pointListDto.setAccu_point(vo.getAccu_point());
        pointListDto.setCurr_point(vo.getCurr_point());

        return pointListDto;
    }
}
