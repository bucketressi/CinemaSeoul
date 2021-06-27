package com.uos.cinemaseoul.common.mapper;


import com.uos.cinemaseoul.dto.user.admin.AdminFindDto;
import com.uos.cinemaseoul.vo.admin.AdminVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AdminMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AdminVo insertIntoAdminFindToAdminVo(AdminFindDto adminFindDto);
}
