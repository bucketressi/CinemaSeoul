package com.uos.cinemaseoul.dao.book;

import com.uos.cinemaseoul.dto.book.hall.HallDto;
import com.uos.cinemaseoul.dto.book.hall.SeatDto;
import com.uos.cinemaseoul.vo.book.HallVo;
import com.uos.cinemaseoul.vo.book.SeatVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;


@Repository
@Mapper
public interface HallDao {

    //상영관 삽입, 수정, 삭제제
    void insert(HallVo vo);
    void insertSeat(int hall_id, int[] seats);

    //수정 후 좌석크기 조정
    void update(HallVo vo);
    void sweapSeat(int hall_id, int seat_num);
    void additionalSeat(int hall_id, int[] seats);

    void delete(int hall_id);

    List<HallDto> selectList();

    //상영관 조회
    HallVo selectHall(int hall_id);
    List<SeatVo> getSeats(int hall_id);

    //좌석 상태 수정
    int updateSeats(SeatVo updateSeats);
    void updateAvaiSeatAmount(int hall_id, String seat_type_ok, String seat_type_disabled);
}
