package com.uos.cinemaseoul.dao.movie;

import com.uos.cinemaseoul.dto.movie.SelectMovieDto;
import com.uos.cinemaseoul.vo.movie.MovieVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Repository
@Mapper
public interface MovieDao {
    int insertMovie(MovieVo vo);
    void insertGenre(HashMap<String, Object> map);
    void insertCasting(HashMap<String, Object> map);

    int deleteMovie(int movi_id);
    int updateMovie(MovieVo vo);
    void deleteGenre(int movi_id);
    void deleteCasting(int movi_id);

    SelectMovieDto selectMovie(int movi_id);
    String[] selectGenre(int movi_id);

}
