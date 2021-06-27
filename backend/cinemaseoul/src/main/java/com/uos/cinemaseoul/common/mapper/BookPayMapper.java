package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.book.bookpay.BookPayInsertDto;
import com.uos.cinemaseoul.vo.book.BookPayVo;
import com.uos.cinemaseoul.vo.book.BookVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface BookPayMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    BookVo insertIntoBookVoByBookInsertDto(BookPayInsertDto bookPayInsertDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    BookPayVo insertIntoBookPayVoByBookInsertDto(BookPayInsertDto bookPayInsertDto);
}
