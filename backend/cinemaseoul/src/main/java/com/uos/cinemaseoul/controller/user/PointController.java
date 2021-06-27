package com.uos.cinemaseoul.controller.user;

import com.uos.cinemaseoul.dto.user.point.PointUpdateDto;
import com.uos.cinemaseoul.service.user.PointService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PointController {

    private final PointService pointService;

    @PostMapping("/point/update")
    public void UpdatePoint(@RequestBody PointUpdateDto pointUpdateDto){
        pointService.updatePoint(pointUpdateDto);
    }

    @GetMapping("/point/{user_id}/{start_date}")
    public ResponseEntity<?> FindPoint(@PathVariable(value = "start_date", required = false) String start_date, @PathVariable(name = "user_id") int user_id){
        return ResponseEntity.ok(pointService.findPoint(start_date,user_id));
    }

    @GetMapping("/point/select/{user_id}")
    public ResponseEntity<?> getMyPoint(@PathVariable(value = "user_id") int user_id){
        return ResponseEntity.ok(pointService.getMyPoint(user_id));
    }
}
