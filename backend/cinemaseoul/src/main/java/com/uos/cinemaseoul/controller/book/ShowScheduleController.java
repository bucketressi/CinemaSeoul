package com.uos.cinemaseoul.controller.book;

import com.uos.cinemaseoul.common.paging.ScheduleCriteria;
import com.uos.cinemaseoul.dto.book.showschedule.InsertScheduleDto;
import com.uos.cinemaseoul.service.book.ShowScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class ShowScheduleController {

    private final ShowScheduleService showScheduleService;

    @PostMapping("/showschedule/add")
    public void addShowSchedule(Authentication authentication, @RequestBody InsertScheduleDto insertScheduleDto){
        System.out.println(authentication.getAuthorities().toString());
        showScheduleService.addShowSchedule(insertScheduleDto);
    }

    @PutMapping("/showschedule/")
    public void updateShowSchedule(@RequestBody InsertScheduleDto insertScheduleDto){
        showScheduleService.updateShowSchedule(insertScheduleDto);
    }

    @DeleteMapping("/showschedule/delete/{show_id}")
    public void deleteShowSchedule(@PathVariable(name = "show_id")int show_id){
        showScheduleService.deleteShowSchedule(show_id);
    }

    @GetMapping("/showschedule/{show_id}/book")
    public void checkBookViaShowSchedule(@PathVariable(name = "show_id") int show_id){
        showScheduleService.checkBookViaShowSchedule(show_id);
    }

    @PostMapping("/showschedule/list")
    public ResponseEntity<?> selectShowScheduleList(@RequestBody ScheduleCriteria scheduleCriteria) throws Exception{
        return ResponseEntity.ok(showScheduleService.getShowScheduleList(scheduleCriteria));
    }

    @GetMapping("/showschedule/{show_id}")
    public ResponseEntity<?> selectShowSchedule(@PathVariable(name = "show_id") int show_id) throws Exception{
        return ResponseEntity.ok(showScheduleService.getShowSchedule(show_id));
    }


}
