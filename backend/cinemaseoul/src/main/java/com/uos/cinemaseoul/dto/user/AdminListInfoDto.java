package com.uos.cinemaseoul.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class AdminListInfoDto {
    String admi_id;
    String admi_name;
    String position;
    String start_date;
}
