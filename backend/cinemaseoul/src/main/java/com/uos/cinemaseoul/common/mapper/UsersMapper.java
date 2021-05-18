package com.uos.cinemaseoul.common.mapper;

import com.uos.cinemaseoul.dto.user.AdminFindDto;
import com.uos.cinemaseoul.dto.user.UserFindDto;
import com.uos.cinemaseoul.vo.user.AdminVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UsersMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    UsersVo insertIntoUserFindToUsersVo(UserFindDto userFindDto);
}
