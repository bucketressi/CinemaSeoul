package com.uos.cinemaseoul.dao.book;

import com.uos.cinemaseoul.common.paging.ScheduleCriteria;
import com.uos.cinemaseoul.dto.book.showschedule.ScheduleInfoDto;
import com.uos.cinemaseoul.vo.book.ShowScheduleVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ShowScheduleDao {
    void insert(ShowScheduleVo vo);

    void update(ShowScheduleVo vo);
    void delete(int show_id);

    int checkBook(int show_id);


    int countList(ScheduleCriteria scheduleCriteria);
    List<ScheduleInfoDto> selectScheduleList(ScheduleCriteria scheduleCriteria);
}
