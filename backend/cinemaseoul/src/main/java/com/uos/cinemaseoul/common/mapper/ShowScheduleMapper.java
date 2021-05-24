package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.book.hall.HallDto;
import com.uos.cinemaseoul.dto.book.showschedule.InsertScheduleDto;
import com.uos.cinemaseoul.vo.book.HallVo;
import com.uos.cinemaseoul.vo.book.ShowScheduleVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ShowScheduleMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ShowScheduleVo insertIntoShowScheduleVoFromInsertScheduleDto(InsertScheduleDto insertScheduleDto);
}
