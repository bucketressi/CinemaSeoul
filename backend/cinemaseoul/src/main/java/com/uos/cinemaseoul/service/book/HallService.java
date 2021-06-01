package com.uos.cinemaseoul.service.book;

import com.uos.cinemaseoul.common.mapper.HallMapper;
import com.uos.cinemaseoul.dao.book.HallDao;
import com.uos.cinemaseoul.dto.book.hall.HallDto;
import com.uos.cinemaseoul.dto.book.hall.HallInfoDto;
import com.uos.cinemaseoul.dto.book.hall.SeatDto;
import com.uos.cinemaseoul.vo.book.HallVo;
import com.uos.cinemaseoul.vo.book.SeatVo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static com.uos.cinemaseoul.common.constatnt.ConstantTable.SEAT_TYPE_DISABLED;
import static com.uos.cinemaseoul.common.constatnt.ConstantTable.SEAT_TYPE_OK;

@Service
@AllArgsConstructor
public class HallService {

    private final HallDao hallDao;
    private final HallMapper hallMapper;

    @Transactional
    public void insertHall(HallDto hallDto) {
        hallDto.setAvai_seat_amount(hallDto.getHall_col() * hallDto.getHall_row());
        HallVo vo = hallMapper.insertIntoHallVoFromHallDto(hallDto);
        hallDao.insert(vo);

        //좌석도 입력
        int[] seats = new int[hallDto.getHall_row()*hallDto.getHall_col()];
        hallDao.insertSeat(vo.getHall_id(), seats);

    }

    @Transactional
    public void updateHall(HallDto updateHallDto) {
        HallVo vo = hallDao.selectHall(updateHallDto.getHall_id());
        //int pastSeat = vo.getHall_col() * vo.getHall_row();
        //int seat_num = updateHallDto.getHall_col() * updateHallDto.getHall_row();
        //updateHallDto.setAvai_seat_amount(seat_num);
        updateHallDto.setHall_col(vo.getHall_col());
        updateHallDto.setHall_row(vo.getHall_row());
        hallDao.update(hallMapper.insertIntoHallVoFromHallDto(updateHallDto));

        /*if(pastSeat > seat_num){
            //크기에 맞지 않는 좌석 삭제
            hallDao.sweapSeat(updateHallDto.getHall_id(), seat_num);
        }
        else if(seat_num > pastSeat){
            int[] seats = new int[seat_num-pastSeat];
            for(int i=0; i<seat_num-pastSeat; i++){
                seats[i] = pastSeat + i;
            }
            hallDao.additionalSeat(updateHallDto.getHall_id(), seats);
        }*/
    }

    @Transactional
    public void deleteHall(int hall_id) {
        hallDao.delete(hall_id);
    }


    public List<HallDto> selectList(){
       return hallDao.selectList();
    }

    @Transactional
    public HallInfoDto selectHall(int hall_id){
        HallInfoDto hdto = new HallInfoDto();
        hdto.setSeats(hallDao.getSeats(hall_id)
                .stream().map(m -> hallMapper.insertIntoSeatDtoFromSeatVo(m)).collect(Collectors.toList()));
        return hdto;
    }

    @Transactional
    public void updateSeats(List<SeatDto> seats){
        List<SeatVo> updateSeats = seats.stream()
                .map(m->hallMapper.insertIntoSeatVoFromSeatDto(m)).collect(Collectors.toList());

        for(SeatVo s : updateSeats){
            hallDao.updateSeats(s);
        }
        System.out.println(SEAT_TYPE_OK + SEAT_TYPE_DISABLED);
        hallDao.updateAvaiSeatAmount(seats.get(0).getHall_id(), SEAT_TYPE_OK, SEAT_TYPE_DISABLED);
    }
}
