package com.uos.cinemaseoul.service.movie;

import com.uos.cinemaseoul.common.mapper.ReviewMapper;
import com.uos.cinemaseoul.dao.movie.ReviewDao;
import com.uos.cinemaseoul.dto.movie.review.MovieReviewDto;
import com.uos.cinemaseoul.dto.movie.review.ReviewDto;
import com.uos.cinemaseoul.vo.movie.ReviewVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewDao reviewDao;
    private final ReviewMapper reviewMapper;

    public void insertReview(ReviewDto reviewDto) {
        ReviewVo vo = reviewMapper.insertintoReviewVoFromReviewDto(reviewDto);
        reviewDao.insertReview(vo);
        reviewDao.updateMovieRating(vo.getMovi_id());
    }

    public void updateReview(ReviewDto reviewDto) {
        ReviewVo vo = reviewMapper.insertintoReviewVoFromReviewDto(reviewDto);
        reviewDao.updateReview(vo);
        reviewDao.updateMovieRating(vo.getMovi_id());
    }

    public void deleteReview(ReviewDto reviewDto){
        reviewDao.deleteReview(reviewMapper.insertintoReviewVoFromReviewDto(reviewDto));
    }

    public List<MovieReviewDto> getMyMovie(int user_id) {
        return reviewDao.getMyMovie(user_id);
    }
}
