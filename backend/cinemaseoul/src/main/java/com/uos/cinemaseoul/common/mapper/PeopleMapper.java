package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.movie.people.PeopleDto;
import com.uos.cinemaseoul.vo.movie.PeopleVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface PeopleMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    PeopleVo insertPeopleVoFromPeopleDto (PeopleDto peopleDto);
}
