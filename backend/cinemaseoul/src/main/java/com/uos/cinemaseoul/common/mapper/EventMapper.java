package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.interactive.event.EventDto;
import com.uos.cinemaseoul.dto.interactive.event.EventShortDto;
import com.uos.cinemaseoul.vo.interactive.EventVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface EventMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    EventVo insertIntoVoFromDto(EventDto eventDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    EventShortDto insertShortDtoFromVo(EventVo vo);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    EventDto insertIntoDtoFromVo(EventVo vo);
}
