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

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HallService {

    private final HallDao hallDao;
    private final HallMapper hallMapper;

    @Transactional
    public void insertHall(HallDto hallDto) {
        HallVo vo = hallMapper.insertIntoHallVoFromHallDto(hallDto);
        hallDao.insert(vo);

        //좌석도 입력
        int[] seats = new int[hallDto.getHall_row()*hallDto.getHall_col()];
        hallDao.insertSeat(vo.getHall_id(), seats);

    }

    @Transactional
    public void updateHall(HallDto updateHallDto) {
        HallVo vo = hallDao.selectHall(updateHallDto.getHall_id());
        int pastSeat = vo.getHall_col() * vo.getHall_row();

        hallDao.update(hallMapper.insertIntoHallVoFromHallDto(updateHallDto));
        int seat_num = updateHallDto.getHall_col() * updateHallDto.getHall_row();

        if(pastSeat > seat_num){
            //크기에 맞지 않는 좌석 삭제
            hallDao.sweapSeat(updateHallDto.getHall_id(), seat_num);
        }
        else{
            int[] seats = new int[seat_num-pastSeat];
            for(int i=0; i<seat_num-pastSeat; i++){
                seats[i] = pastSeat + i;
            }
            hallDao.additionalSeat(updateHallDto.getHall_id(), seats);
        }
    }

    @Transactional
    public void deleteHall(HallDto hallDto) {
        hallDao.delete(hallDto.getHall_id());
    }


    public List<HallDto> selectList(){
       return hallDao.selectList();
    }

    @Transactional
    public HallInfoDto selectHall(int hall_id){
        HallInfoDto hallInfoDto = hallMapper.insertIntoHallInfoDtoFromHallVo(hallDao.selectHall(hall_id));
        hallInfoDto.setSeats(hallDao.getSeats(hall_id)
                    .stream().map(m -> hallMapper.insertIntoSeatDtoFromSeatVo(m)).collect(Collectors.toList()));
        return hallInfoDto;
    }

    @Transactional
    public void updateSeats(List<SeatDto> seats){
        List<SeatVo> updateSeats = seats.stream()
                .map(m->hallMapper.insertIntoSeatVoFromSeatDto(m)).collect(Collectors.toList());

        for(SeatVo s : updateSeats){
            hallDao.updateSeats(s);
        }
    }
}
