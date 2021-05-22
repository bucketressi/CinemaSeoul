package com.uos.cinemaseoul.controller.book;

import com.uos.cinemaseoul.dto.book.hall.HallDto;
import com.uos.cinemaseoul.dto.book.hall.SeatDto;
import com.uos.cinemaseoul.service.book.HallService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class HallController {

    private final HallService hallService;

    @PostMapping("/hall")
    public void insertHall(@RequestBody HallDto hallDto){
        hallService.insertHall(hallDto);
    }

    @PutMapping("/hall")
    public void updateHall(@RequestBody HallDto updateHallDto){
        hallService.updateHall(updateHallDto);
    }

    @DeleteMapping("/hall")
    public void deleteHall(@RequestBody HallDto updateHallDto){
        hallService.deleteHall(updateHallDto);
    }
    @GetMapping("/hall")
    public ResponseEntity<?> getHallList(){
        return ResponseEntity.ok(hallService.selectList());
    }

    @GetMapping("/hall/{hall_id}")
    public ResponseEntity<?> getHall(@PathVariable(name = "hall_id") int hall_id){
        return ResponseEntity.ok(hallService.selectHall(hall_id));
    }

    @PostMapping("/hall/seat")
    public void updateSeat(@RequestBody Map<String,List<SeatDto>> updateSeat){
        hallService.updateSeats(updateSeat.get("seats"));
    }
}
