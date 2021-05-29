package com.uos.cinemaseoul.dao.movie;

import com.uos.cinemaseoul.vo.movie.ReviewVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

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

}
