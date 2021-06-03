package com.uos.cinemaseoul.controller.interactive;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.interactive.FAQDto;
import com.uos.cinemaseoul.service.interactive.FAQService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FAQController {

    private final FAQService faqService;

    @PostMapping("/faq/add")
    public void addFAQ(Authentication authentication, @RequestBody FAQDto faqDto){
        faqDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        faqService.addFAQ(faqDto);
    }

    @PutMapping("/faq/update")
    public void updateFAQ(Authentication authentication, @RequestBody FAQDto faqDto){
        faqDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        faqService.updateFAQ(faqDto);
    }

    @DeleteMapping("/faq/delete/{faq_id}")
    public void deleteFAQ(@PathVariable(name="faq_id")int faq_id){
        faqService.deleteFAQ(faq_id);
    }

    @PostMapping("/faq/list")
    public ResponseEntity<?> getFAQList(@RequestBody Criteria criteria){
        return ResponseEntity.ok(faqService.getFAQList(criteria));
    }

    @GetMapping("/faq/{faq_id}")
    public ResponseEntity<?> getFAQ(@PathVariable(name = "faq_id") int faq_id){
        return ResponseEntity.ok(faqService.getFAQ(faq_id));
    }

}
