package com.uos.cinemaseoul.controller.book;

import com.uos.cinemaseoul.dto.book.bookpay.BookPayInsertDto;
import com.uos.cinemaseoul.service.book.BookPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/pay")
public class BookPayController {

    private final BookPayService bookPayService;

    @PostMapping("/book")
    public ResponseEntity<?> payBook(@RequestBody BookPayInsertDto bookPayInsertDto){
        return ResponseEntity.ok(bookPayService.payBook(bookPayInsertDto));
    }

}
