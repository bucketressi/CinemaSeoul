package com.uos.cinemaseoul.controller.interactive;

import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.interactive.notice.NoticeDto;
import com.uos.cinemaseoul.service.interactive.NoticeService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping("/notice/add")
    public void addNotice(Authentication authentication, @RequestBody NoticeDto noticeDto){
        noticeDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        noticeService.addNotice(noticeDto);
    }

    @PutMapping("/notice/update")
    public void updateNotice(Authentication authentication, @RequestBody NoticeDto noticeDto){
        noticeDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        noticeService.updateNotice(noticeDto);
    }

    @DeleteMapping("/notice/delete/{noti_id}")
    public void deleteNotice(@PathVariable(name = "noti_id") int noti_id){
        noticeService.deleteNotice(noti_id);
    }

    @PostMapping("/notice/list")
    public ResponseEntity<?> getNoticeList(@RequestBody Criteria criteria){
        return ResponseEntity.ok(noticeService.getNoticeList(criteria));
    }

    @GetMapping("/notice/{noti_id}")
    public ResponseEntity<?> getNotice(@PathVariable(name = "noti_id") int noti_id){
        return ResponseEntity.ok(noticeService.getNotice(noti_id));
    }
}

