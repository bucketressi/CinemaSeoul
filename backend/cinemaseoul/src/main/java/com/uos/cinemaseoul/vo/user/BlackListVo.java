package com.uos.cinemaseoul.vo.user;

import lombok.*;
import org.apache.ibatis.type.Alias;
import org.mybatis.spring.annotation.MapperScan;


@Getter @Setter
@Builder
@AllArgsConstructor
public class BlackListVo {
    private String blac_name;
    private String phone_num;
    private String birth;
}
