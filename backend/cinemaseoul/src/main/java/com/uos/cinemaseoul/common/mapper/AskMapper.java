package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.interactive.ask.AskDto;
import com.uos.cinemaseoul.dto.interactive.ask.AskShortDto;
import com.uos.cinemaseoul.vo.interactive.AskVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AskMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AskVo insertIntoVoFromDto(AskDto askDto);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AskShortDto insertIntoShortDtoFromVo(AskVo vo);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AskDto insertIntoDtoFromVo(AskVo askVo);
}
