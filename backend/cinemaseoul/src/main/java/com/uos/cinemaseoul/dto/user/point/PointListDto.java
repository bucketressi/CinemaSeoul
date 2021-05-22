package com.uos.cinemaseoul.dto.user.point;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointListDto {
    public int user_id;
    public List<PointInfoDto> point = new ArrayList<>();
    public int curr_point;
    public int accu_point;
}
