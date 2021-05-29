package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.movie.review.ReviewDto;
import com.uos.cinemaseoul.vo.movie.ReviewVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ReviewVo insertintoReviewVoFromReviewDto(ReviewDto reviewDto);
}
