package com.uos.cinemaseoul.controller.movie;

import com.uos.cinemaseoul.dto.movie.review.ReviewDto;
import com.uos.cinemaseoul.service.movie.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/review")
    public void insertReview(@RequestBody ReviewDto reviewDto){
        reviewService.insertReview(reviewDto);
    }

    @PutMapping("/review")
    public void updateReview(@RequestBody ReviewDto reviewDto){
        reviewService.updateReview(reviewDto);
    }

    @DeleteMapping("/review/delete/{user_id}/{movi_id}")
    public void deleteReview(@PathVariable(name = "user_id") int user_id, @PathVariable(name="movi_id") int movi_id){
        reviewService.deleteReview(user_id, movi_id);
    }

    @GetMapping("/mymovie/{user_id}")
    public ResponseEntity<?> getMyMovie(@PathVariable(name = "user_id") int user_id){
        return ResponseEntity.ok(reviewService.getMyMovie(user_id));
    }
}
