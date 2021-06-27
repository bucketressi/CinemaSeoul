package com.uos.cinemaseoul.dto.interactive.faq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FAQShortDto {
    private int faq_id;
    private String admi_name;
    private String faq_title;
}
