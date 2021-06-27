package com.uos.cinemaseoul.dao.movie;

import com.uos.cinemaseoul.dto.movie.review.MovieReviewDto;
import com.uos.cinemaseoul.vo.movie.ReviewVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ReviewDao {

    //관람평 작성
    void insertReview(ReviewVo vo);

    //관람평 수정
    void updateReview(ReviewVo vo);

    //관람평 삭제
    void deleteReview(ReviewVo vo);

    //영화 평점 업데이트
    void updateMovieRating(int movi_id);

    //영화 받아오기
    List<MovieReviewDto> getMyMovie(int user_id, String pay_stat_fin);

    //영화 숫자 받아와서 0으로만들기
    int getCount(int movi_id);
    void updateMovieRatingToZero(int movi_id);

}
