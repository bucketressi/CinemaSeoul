package com.uos.cinemaseoul.common.mapper;


import com.uos.cinemaseoul.dto.interactive.ask.AskDto;
import com.uos.cinemaseoul.dto.interactive.notice.NoticeDto;
import com.uos.cinemaseoul.dto.interactive.notice.NoticeShortDto;
import com.uos.cinemaseoul.vo.interactive.NoticeVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface NoticeMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    NoticeVo insertIntoVoFromDto(NoticeDto noticeDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    NoticeShortDto insertIntoShortFromVo(NoticeVo vo);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    NoticeDto insertIntoDtoFromVo(NoticeVo vo);
}
