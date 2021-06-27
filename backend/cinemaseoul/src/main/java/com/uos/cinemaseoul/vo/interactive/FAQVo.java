package com.uos.cinemaseoul.vo.interactive;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class FAQVo {
    private int faq_id;
    private int admi_id;
    private String admi_name;
    private String faq_title;
    private String faq_contents;
}
