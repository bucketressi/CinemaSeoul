package com.uos.cinemaseoul.service.movie;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.mapper.ReviewMapper;
import com.uos.cinemaseoul.dao.movie.ReviewDao;
import com.uos.cinemaseoul.dto.movie.review.MovieReviewDto;
import com.uos.cinemaseoul.dto.movie.review.ReviewDto;
import com.uos.cinemaseoul.service.user.PointService;
import com.uos.cinemaseoul.vo.movie.ReviewVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.uos.cinemaseoul.common.constatnt.ConstantTable.*;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewDao reviewDao;
    private final ReviewMapper reviewMapper;
    private final PointService pointService;

    @Transactional
    public void insertReview(ReviewDto reviewDto) {
        ReviewVo vo = reviewMapper.insertintoReviewVoFromReviewDto(reviewDto);
        reviewDao.insertReview(vo);
        reviewDao.updateMovieRating(vo.getMovi_id());
        pointService.updatePoint(reviewDto.getUser_id(), 100, POINT_CODE_ADD, "리뷰 작성으로 인한 포인트 지급!");
    }
    @Transactional
    public void updateReview(ReviewDto reviewDto) {
        ReviewVo vo = reviewMapper.insertintoReviewVoFromReviewDto(reviewDto);
        reviewDao.updateReview(vo);
        reviewDao.updateMovieRating(vo.getMovi_id());
    }

    @Transactional
    public void deleteReview(int user_id, int movi_id){

        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setMovi_id(movi_id);
        reviewDto.setUser_id(user_id);

        reviewDao.deleteReview(reviewMapper.insertintoReviewVoFromReviewDto(reviewDto));
        reviewDao.updateMovieRating(reviewDto.getMovi_id());
        pointService.updatePoint(reviewDto.getUser_id(), 100, POINT_CODE_NOTADD, "리뷰 삭제로 인한 포인트 회수!");
    }
    @Transactional
    public List<MovieReviewDto> getMyMovie(int user_id) {
        return reviewDao.getMyMovie(user_id, PAY_STAT_FIN);
    }
}
