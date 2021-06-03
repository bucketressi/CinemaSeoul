package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.mapper.PointMapper;
import com.uos.cinemaseoul.dao.user.PointDao;
import com.uos.cinemaseoul.dto.user.point.PointListDto;
import com.uos.cinemaseoul.dto.user.point.PointUpdateDto;
import com.uos.cinemaseoul.vo.user.PointVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.uos.cinemaseoul.common.constatnt.ConstantTable.*;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointDao pointDao;

    @Transactional
    public void updatePoint(PointUpdateDto pointUpdateDto) {
        updatePoint(pointUpdateDto.getUser_id(), pointUpdateDto.getPoin_amount(),
                pointUpdateDto.getPoin_type_code(),pointUpdateDto.getMessage());
    }


    @Transactional
    public PointListDto findPoint(String start_date, int user_id){
        PointListDto pointListDto = new PointListDto();
        UsersVo vo = pointDao.getPoint(user_id);

        pointListDto.setUser_id(user_id);
        pointListDto.setPoint(pointDao.findPoint(start_date, user_id));
        pointListDto.setAccu_point(vo.getAccu_point());
        pointListDto.setCurr_point(vo.getCurr_point());

        return pointListDto;
    }

    @Transactional
    public void updatePoint(int user_id, int use_point, String code, String s){
        PointVo pointVo = PointVo.builder()
                .user_id(user_id)
                .poin_amount(use_point)
                .poin_type_code(code)
                .message(s)
                .build();

        if(code.equals(POINT_CODE_ADD)){
            addPoint(pointVo);
        }
        else if(code.equals(POINT_CODE_USE)){
            minusPoint(pointVo);
        }
        else if(code.equals(POINT_CODE_NOTADD)){
            notAddPoint(pointVo);
        }
        else if(code.equals(POINT_CODE_NOTUSE)){
            notUsePoint(pointVo);
        }
    }

    @Transactional
    public void notAddPoint(PointVo pointVo) {
        pointDao.updatePoint(pointVo);
        pointDao.returnUserUsePoint(pointVo);
    }

    @Transactional
    public void notUsePoint(PointVo pointVo) {
        pointDao.updatePoint(pointVo);
        pointDao.returnUserAddPoint(pointVo);
    }

    @Transactional
    public void addPoint(PointVo pointVo) {
        pointDao.updatePoint(pointVo);
        pointDao.plusUserPoint(pointVo);
    }

    @Transactional
    public void minusPoint(PointVo pointVo) {
        pointDao.updatePoint(pointVo);
        pointDao.minusUserPoint(pointVo);
    }

    @Transactional
    public int getMyPoint(int user_id) {
        return pointDao.getPoint(user_id).getCurr_point();
    }
}
