package com.uos.cinemaseoul.service.movie;

import com.uos.cinemaseoul.common.mapper.MovieMapper;
import com.uos.cinemaseoul.dao.movie.MovieDao;
import com.uos.cinemaseoul.dto.movie.InsertMovieDto;
import com.uos.cinemaseoul.dto.movie.SelectMovieDto;
import com.uos.cinemaseoul.dto.movie.UpdateMovieDto;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.movie.MovieVo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Service
@AllArgsConstructor
public class MovieService {

    private final MovieDao movieDao;
    private final MovieMapper movieMapper;

    //영화 삽입
    @Transactional
    public void insertMovie(InsertMovieDto iMDto){
        MovieVo movieVo = movieMapper.insertMovieDtoToMovieVo(iMDto);
        movieDao.insertMovie(movieVo);
        int movi_id = movieVo.getMovi_id();

        //삽입값 세팅
        HashMap<String,Object> map = new HashMap<>();
        map.put("genre",iMDto.getGenre_code());
        map.put("movi_id", movi_id);
        map.put("casting", iMDto.getCasting());

        movieDao.insertGenre(map);
        System.out.println("장르는 됨");

        movieDao.insertCasting(map);
    }

    //삭제
    @Transactional
    public void deleteMovie(int movi_id){
        if(movieDao.deleteMovie(movi_id) != 1){
            throw new WrongArgException("too much");
        }
    }

    //업데이트
    @Transactional
    public void updateMovie(UpdateMovieDto uMDto){
        MovieVo movieVo = movieMapper.updateMovieDtoToMovieVo(uMDto);

        if(movieDao.updateMovie(movieVo) != 1){
            throw new WrongArgException("too much");
        }

        HashMap<String,Object> map = new HashMap<>();
        map.put("genre",uMDto.getGenre_code());
        map.put("movi_id", uMDto.getMovi_id());
        map.put("casting", uMDto.getCasting());

        //장르재설정
        movieDao.deleteGenre(movieVo.getMovi_id());
        movieDao.insertGenre(map);

        //인물재설정
        movieDao.deleteCasting(movieVo.getMovi_id());
        movieDao.insertCasting(map);
    }

    //영화 조회
    @Transactional
    public SelectMovieDto selectMovie(int movi_id){
        SelectMovieDto sMDto = movieDao.selectMovie(movi_id);

        if(sMDto == null){
            throw new NotFoundException("no Movie Detected");
        }

        System.out.println(sMDto.getMovi_name() + "아니 이거 왜안돼" + sMDto.getCasting());
        String[] genre = movieDao.selectGenre(movi_id);
        if(genre != null){
            sMDto.setGenre(genre);
        }
        return sMDto;
    }
}
