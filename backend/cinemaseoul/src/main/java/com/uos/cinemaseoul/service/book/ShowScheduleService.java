package com.uos.cinemaseoul.service.book;

import com.uos.cinemaseoul.common.mapper.ShowScheduleMapper;
import com.uos.cinemaseoul.common.paging.ScheduleCriteria;
import com.uos.cinemaseoul.dao.book.ShowScheduleDao;
import com.uos.cinemaseoul.dto.book.book.ShowScheduleDto;
import com.uos.cinemaseoul.dto.book.showschedule.InsertScheduleDto;
import com.uos.cinemaseoul.dto.book.showschedule.ScheduleInfoDto;
import com.uos.cinemaseoul.dto.book.showschedule.ShowScheduleListDto;
import com.uos.cinemaseoul.exception.NotAllowedException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.vo.book.ShowScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class ShowScheduleService {

    private final ShowScheduleDao showScheduleDao;
    private final ShowScheduleMapper showScheduleMapper;

    @Transactional
    public void addShowSchedule(InsertScheduleDto insertScheduleDto) {
        ShowScheduleVo vo = showScheduleMapper.insertIntoShowScheduleVoFromInsertScheduleDto(insertScheduleDto);
        showScheduleDao.insert(vo);
    }

    @Transactional
    public void checkBookViaShowSchedule(int show_id) {
       if(showScheduleDao.checkBook(show_id) > 0){
           throw new NotAllowedException();
       }
    }

    @Transactional
    public void updateShowSchedule(InsertScheduleDto updateScheduleDto) {
        try{
            checkBookViaShowSchedule(updateScheduleDto.getShow_id());
            ShowScheduleVo vo = showScheduleMapper.insertIntoShowScheduleVoFromInsertScheduleDto(updateScheduleDto);
            showScheduleDao.update(vo);
        }catch (DataAccessException e){
            throw new NotAllowedException();
        }
    }

    @Transactional
    public void deleteShowSchedule(int show_id){
        checkBookViaShowSchedule(show_id);
        showScheduleDao.delete(show_id);
    }

    @Transactional
    public ShowScheduleListDto getShowScheduleList(ScheduleCriteria scheduleCriteria) throws Exception{
        ShowScheduleListDto sLDto = new ShowScheduleListDto();

        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmm");

        //페이지 계산
        int totalCount = showScheduleDao.countList(scheduleCriteria);
        int totalPage =  totalCount /  scheduleCriteria.getAmount();
        if(totalCount %  scheduleCriteria.getAmount() > 0){
            totalPage++;
        }

        //기본적인 값 삽입
        sLDto.setShowschedule_list(showScheduleDao.selectScheduleList(scheduleCriteria));
        for(ScheduleInfoDto s : sLDto.getShowschedule_list()){

            //시간 계산
            s.setEnd_time(calEndTime(s.getShow_date(),s.getShow_time(),s.getEnd_time()));

            //선택 되는 좌석 - 예매된 좌석
            s.setRema_seat(s.getAvai_seat_amount() - showScheduleDao.getBookedSeatNum(s.getShow_id()));
        }


        sLDto.setPageInfo(totalPage, scheduleCriteria.getPage(), scheduleCriteria.getAmount());
        return sLDto;
    }

    @Transactional
    public ShowScheduleDto getShowSchedule(int show_id) throws Exception{
        ShowScheduleDto showDto = showScheduleDao.selectSchedule(show_id);

        if(showDto == null) {
            throw new NotFoundException("No Schedule");
        }
        //시간계산
        showDto.setEnd_time(calEndTime(showDto.getShow_date(), showDto.getShow_time(), showDto.getEnd_time()));

        return showDto;
    }

    public String calEndTime(String startDate, String startTime, String runtime) throws Exception{

        try{
            //시간 계산
            Long initialTime = new SimpleDateFormat("yyyyMMddHHmm").parse(startDate+ startTime).getTime();
            initialTime = initialTime+ Long.parseLong(runtime)* 60 *1000;
            return new SimpleDateFormat("yyyy/MM/dd/HH/mm").format(new Date(initialTime));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
