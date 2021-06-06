package com.uos.cinemaseoul.service.movie;

import com.uos.cinemaseoul.common.mapper.MovieMapper;
import com.uos.cinemaseoul.common.paging.MovieCriteria;
import com.uos.cinemaseoul.common.paging.MovieSearchCriteria;
import com.uos.cinemaseoul.dao.movie.MovieDao;
import com.uos.cinemaseoul.dto.movie.*;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.movie.MovieVo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieDao movieDao;
    private final MovieMapper movieMapper;

    //영화 삽입
    @Transactional
    public int insertMovie(InsertMovieDto iMDto){
        MovieVo movieVo = movieMapper.insertMovieDtoToMovieVo(iMDto);
        movieDao.insertMovie(movieVo);
        return movieVo.getMovi_id();
    }
    @Transactional
    public void updateMovieGenre(InsertGenreDto iMDto) {
        movieDao.deleteGenre(iMDto.getMovi_id());

        //삽입값 세팅
        HashMap<String,Object> map = new HashMap<>();
        map.put("genre",iMDto.getGenre_code());
        map.put("movi_id", iMDto.getMovi_id());

        movieDao.insertGenre(map);
    }
    @Transactional
    public void updateMovieCast(InsertCastDto iMDto) {
        movieDao.deleteCasting(iMDto.getMovi_id());

        //삽입값 세팅
        HashMap<String,Object> map = new HashMap<>();
        map.put("movi_id", iMDto.getMovi_id());
        map.put("casting", iMDto.getCasting());

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
    }

    //이미지 업데이트
    @Transactional
    public void updateMovieImage(int movi_id, byte[] image) {
        MovieVo movieVo = MovieVo.builder().movi_id(movi_id).image(image).build();
        if(movieDao.updateMovieImage(movieVo) != 1){
            throw new WrongArgException("too much");
        }
    }

    //영화 조회
    @Transactional
    public SelectMovieDto selectMovie(int movi_id){
        SelectMovieDto sMDto = movieDao.selectMovie(movi_id);

        if(sMDto == null){
            throw new NotFoundException("no Movie Detected");
        }

        sMDto.setCasting(movieDao.selectCast(movi_id));
        String[] genre = movieDao.selectGenre(movi_id);
        if(genre != null){
            sMDto.setGenre(genre);
        }
        return sMDto;
    }

    //영화 조건 조회
    @Transactional
    public MovieListDto selectMovieList(MovieCriteria movieCriteria){
        MovieListDto movieListDto = new MovieListDto();
        //페이지 계산
        int totalCount = movieDao.countList(movieCriteria);
        int totalPage =  totalCount / movieCriteria.getAmount();
        if(totalCount % movieCriteria.getAmount() > 0){
            totalPage++;
        }

        movieListDto.setMovi_list(movieDao.selectMovieList(movieCriteria));
        movieListDto.setPageInfo(totalPage, movieCriteria.getPage(), movieCriteria.getAmount());
        return movieListDto;
    }

    //영화 검색
    @Transactional
    public MovieListDto searchMovie(MovieSearchCriteria movieSearchCriteria) {
        movieSearchCriteria.setName("%" + movieSearchCriteria.getName() + "%");
        MovieListDto movieListDto = new MovieListDto();
        //페이지 계산
        int totalCount = movieDao.countSearchList(movieSearchCriteria);
        int totalPage =  totalCount / movieSearchCriteria.getAmount();
        if(totalCount % movieSearchCriteria.getAmount() > 0){
            totalPage++;
        }
        movieListDto.setMovi_list(movieDao.searchMovie(movieSearchCriteria));
        movieListDto.setPageInfo(totalPage, movieSearchCriteria.getPage(), movieSearchCriteria.getAmount());
        return movieListDto;
    }


}
