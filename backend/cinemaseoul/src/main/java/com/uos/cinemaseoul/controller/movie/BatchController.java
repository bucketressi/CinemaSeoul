package com.uos.cinemaseoul.controller.movie;

import com.uos.cinemaseoul.dto.movie.batch.DateRangeDto;
import com.uos.cinemaseoul.service.movie.BatchService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BatchController {

    private final BatchService batchService;

    @PostMapping("/record")
    public ResponseEntity<?> getAudienceRecord(@RequestBody DateRangeDto dateRange) {
        return ResponseEntity.ok(batchService.getAudience(dateRange));
    }

    @PostMapping("/sales")
    public ResponseEntity<?> getSales(@RequestBody DateRangeDto dateRangeDto){
        return ResponseEntity.ok(batchService.getSales(dateRangeDto));
    }

    @GetMapping("/sales/update")
    public void updateSales(){
        batchService.updateSalesToday();
    }
}
