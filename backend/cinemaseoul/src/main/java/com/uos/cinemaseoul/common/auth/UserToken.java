package com.uos.cinemaseoul.common.auth;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserToken{
    private Long id;
    List<String> type;
    String password;
}
