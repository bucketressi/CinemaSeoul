package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.product.productpay.ProductInfoInsertDto;
import com.uos.cinemaseoul.dto.product.productpay.ProductPayInsertDto;
import com.uos.cinemaseoul.vo.product.ProductPayInfoVo;
import com.uos.cinemaseoul.vo.product.ProductPayVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProductPayMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "total_price", target = "price")
    ProductPayVo insertIntoProdPayVoFromInsertDto(ProductPayInsertDto productPayInsertDto);
}
