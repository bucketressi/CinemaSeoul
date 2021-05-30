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

    @DeleteMapping("/review")
    public void deleteReview(@RequestBody ReviewDto reviewDto){
        reviewService.deleteReview(reviewDto);
    }

    @GetMapping("/mymovie/{user_id}")
    public ResponseEntity<?> getMyMovie(@PathVariable(name = "user_id") int user_id){
        return ResponseEntity.ok(reviewService.getMyMovie(user_id));
    }
}
