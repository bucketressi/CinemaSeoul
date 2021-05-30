package com.uos.cinemaseoul.controller.common;

import com.uos.cinemaseoul.service.common.CodeService;
import com.uos.cinemaseoul.vo.common.CodeVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @GetMapping("/code/list")
    public ResponseEntity<?> getCodeList(){
        return ResponseEntity.ok(codeService.getCode());
    }

    @GetMapping("/code/genre/list")
    public ResponseEntity<?> getGenreList(){
        return ResponseEntity.ok(codeService.getCode());
    }

    @GetMapping("/code/message")
    public ResponseEntity<?> getMessage(){
        return ResponseEntity.ok(codeService.getMessage());
    }
}
