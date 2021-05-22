package com.uos.cinemaseoul.dao.movie;

import com.uos.cinemaseoul.common.paging.MovieCriteria;
import com.uos.cinemaseoul.common.paging.MovieSearchCriteria;
import com.uos.cinemaseoul.dto.movie.MovieListDto;
import com.uos.cinemaseoul.dto.movie.MovieListInfoDto;
import com.uos.cinemaseoul.dto.movie.SelectMovieDto;
import com.uos.cinemaseoul.vo.movie.MovieVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
@Mapper
public interface MovieDao {
    int insertMovie(MovieVo vo);
    void insertGenre(HashMap<String, Object> map);
    void insertCasting(HashMap<String, Object> map);

    int deleteMovie(int movi_id);

    int updateMovie(MovieVo vo);
    int updateMovieImage(MovieVo movieVo);

    void deleteGenre(int movi_id);
    void deleteCasting(int movi_id);

    SelectMovieDto selectMovie(int movi_id);
    String[] selectGenre(int movi_id);

    int countList(MovieCriteria movieCriteria);
    List<MovieListInfoDto> selectMovieList(MovieCriteria movieCriteria);


    int countSearchList(MovieSearchCriteria movieSearchCriteria);
    List<MovieListInfoDto> searchMovie(MovieSearchCriteria movieSearchCriteria);

}
