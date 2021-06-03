package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.book.bookpay.BookPayInsertDto;
import com.uos.cinemaseoul.dto.interactive.FAQDto;
import com.uos.cinemaseoul.vo.book.BookVo;
import com.uos.cinemaseoul.vo.interactive.FAQVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface FAQMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    FAQVo insertIntoFAQVoByFAQDto(FAQDto faqDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    FAQDto insertIntoFAQDtoByFAQVo(FAQVo o);
}
