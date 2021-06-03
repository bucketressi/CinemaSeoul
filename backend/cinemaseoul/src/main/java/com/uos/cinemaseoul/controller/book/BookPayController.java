package com.uos.cinemaseoul.controller.book;

import com.uos.cinemaseoul.common.paging.PayListCriteria;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayInsertDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.service.book.BookPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BookPayController {

    private final BookPayService bookPayService;

    @PostMapping("/pay/book")
    public ResponseEntity<?> payBook(@RequestBody BookPayInsertDto bookPayInsertDto){
        return ResponseEntity.ok(bookPayService.payBook(bookPayInsertDto));
    }

    @PostMapping("/pay/use/book")
    public void useProductCode(@RequestBody Map<String,String> map){
        bookPayService.useProductCode(map.get("use_code"));
    }

    @PostMapping("/pay/book/list")
    public ResponseEntity<?> getBookPayList(Authentication authentication, @RequestBody PayListCriteria payListCriteria){

        //매니저 아니면 자기 것만 조회 가능
        if(!authentication.getAuthorities().toString().contains("ROLE_3")){
            payListCriteria.setUser_id(Integer.parseInt(authentication.getName()));
        }

        return ResponseEntity.ok(bookPayService.getList(payListCriteria));
    }

}
