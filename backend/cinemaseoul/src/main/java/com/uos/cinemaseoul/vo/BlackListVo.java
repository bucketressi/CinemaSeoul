package com.uos.cinemaseoul.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;
import org.mybatis.spring.annotation.MapperScan;

@Getter @Setter
@AllArgsConstructor
public class BlackListVo {
    private String blac_name;
    private String phone_num;
    private String birth;
}
