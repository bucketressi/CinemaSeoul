package com.uos.cinemaseoul.controller.book;

import com.uos.cinemaseoul.common.paging.ScheduleCriteria;
import com.uos.cinemaseoul.dto.book.showschedule.InsertScheduleDto;
import com.uos.cinemaseoul.service.book.ShowScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Map;

@RestController
@RequestMapping(value = "/showschedule")
@RequiredArgsConstructor
public class ShowScheduleController {

    private final ShowScheduleService showScheduleService;

    @PostMapping("/add")
    public void addShowSchedule(@RequestBody InsertScheduleDto insertScheduleDto){
        showScheduleService.addShowSchedule(insertScheduleDto);
    }

    @PutMapping("/")
    public void updateShowSchedule(@RequestBody InsertScheduleDto insertScheduleDto){
        showScheduleService.updateShowSchedule(insertScheduleDto);
    }

    @DeleteMapping("/delete/{show_id}")
    public void deleteShowSchedule(@PathVariable(name = "show_id")int show_id){
        showScheduleService.deleteShowSchedule(show_id);
    }

    @GetMapping("/{show_id}/book")
    public void checkBookViaShowSchedule(@PathVariable(name = "show_id") int show_id){
        showScheduleService.checkBookViaShowSchedule(show_id);
    }

    @PostMapping("/list")
    public ResponseEntity<?> selectShowScheduleList(@RequestBody ScheduleCriteria scheduleCriteria) throws Exception{
        return ResponseEntity.ok(showScheduleService.getShowScheduleList(scheduleCriteria));
    }

    @GetMapping("/{show_id}")
    public ResponseEntity<?> selectShowSchedule(@PathVariable(name = "show_id") int show_id) throws Exception{
        return ResponseEntity.ok(showScheduleService.getShowSchedule(show_id));
    }


}
