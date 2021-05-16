package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.movie.InsertMovieDto;
import com.uos.cinemaseoul.dto.movie.UpdateMovieDto;
import com.uos.cinemaseoul.vo.movie.MovieVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface MovieMapper{

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    MovieVo insertMovieDtoToMovieVo (InsertMovieDto insertMovieDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    MovieVo updateMovieDtoToMovieVo (UpdateMovieDto updateMovieDto);
}