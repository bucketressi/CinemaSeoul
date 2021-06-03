package com.uos.cinemaseoul.dto.interactive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FAQDto {
    private int faq_id;
    private int admi_id;
    private String admi_name;
    private String faq_title;
    private String faq_contents;
}
