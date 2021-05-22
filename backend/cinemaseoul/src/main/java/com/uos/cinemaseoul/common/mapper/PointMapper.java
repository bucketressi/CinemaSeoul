package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.user.point.PointUpdateDto;
import com.uos.cinemaseoul.vo.user.PointVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface PointMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    PointVo insertIntoPointVoFromPointUpdateDto(PointUpdateDto pointUpdateDto);
}
