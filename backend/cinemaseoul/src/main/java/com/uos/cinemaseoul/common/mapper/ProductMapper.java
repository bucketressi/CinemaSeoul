package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.product.ProductDto;
import com.uos.cinemaseoul.vo.product.ProductVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ProductVo insertIntoProdcutVoFromProdcutDto(ProductDto dto);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ProductDto insertIntoProdcutDtoFromProdcutVo(ProductVo vo);
}
