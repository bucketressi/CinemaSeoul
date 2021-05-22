package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.book.hall.HallDto;
import com.uos.cinemaseoul.dto.book.hall.HallInfoDto;
import com.uos.cinemaseoul.dto.book.hall.SeatDto;
import com.uos.cinemaseoul.vo.book.HallVo;
import com.uos.cinemaseoul.vo.book.SeatVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface HallMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    HallVo insertIntoHallVoFromHallDto(HallDto hallDto);


    SeatDto insertIntoSeatDtoFromSeatVo(SeatVo vo);
    SeatVo insertIntoSeatVoFromSeatDto(SeatDto m);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    HallInfoDto insertIntoHallInfoDtoFromHallVo(HallVo vo);


}
