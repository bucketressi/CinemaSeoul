package com.uos.cinemaseoul.dao.movie;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.movie.people.CastingMovieDto;
import com.uos.cinemaseoul.dto.movie.people.PeopleDetailDto;
import com.uos.cinemaseoul.dto.movie.people.PeopleInfoDto;
import com.uos.cinemaseoul.vo.movie.PeopleVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface PeopleDao {

    //SearchShort
    List<PeopleInfoDto> searchPeople(String peop_name);

    //Detail
    PeopleDetailDto getPeople(int peop_id);
    List<CastingMovieDto> getCastMovies(int peop_id);

    //List
    int countList(Criteria criteria);
    List<PeopleInfoDto> getPeopleList(Criteria criteria);

    //add
    void insertPeople(PeopleVo peopleVo);

    //delete
    int deletePeople(int peop_id);

    //update
    int updatePeople(PeopleVo peoplevo);
    void updateCasting(PeopleVo peopleVo);

    //updateImage
    int updatePeopleImage(PeopleVo peoplevo);
}
