package com.uos.cinemaseoul.vo.movie;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class PeopleVo {
    private int peop_id;
    private String peop_name;
    private String nation;
    private String birth;
    private String peop_contents;
    private byte[] image;
}
