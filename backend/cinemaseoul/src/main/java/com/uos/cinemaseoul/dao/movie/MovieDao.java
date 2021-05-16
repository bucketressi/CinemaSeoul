package com.uos.cinemaseoul.dao.movie;

import com.uos.cinemaseoul.dto.movie.CastingDto;
import com.uos.cinemaseoul.vo.movie.MovieVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;
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
    void deleteGenre(int movi_id);
    void deleteCasting(int movi_id);

}
