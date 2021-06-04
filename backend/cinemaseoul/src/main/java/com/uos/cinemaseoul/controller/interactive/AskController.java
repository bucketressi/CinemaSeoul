package com.uos.cinemaseoul.controller.interactive;

import com.uos.cinemaseoul.common.paging.AskCriteria;
import com.uos.cinemaseoul.dto.interactive.ask.AskDto;
import com.uos.cinemaseoul.service.interactive.AskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AskController {
    private final AskService askService;

    @PostMapping("/ask/add")
    public void addAsk(Authentication authentication, @RequestBody AskDto askDto){
        askDto.setUser_id(Integer.parseInt(authentication.getName()));
        askService.addAsks(askDto);
    }

    @PutMapping("/ask/update")
    public void updateAsk(Authentication authentication, @RequestBody AskDto askDto){
        askDto.setUser_id(Integer.parseInt(authentication.getName()));
        askService.updateAsks(askDto);
    }

    @DeleteMapping("/ask/delete/{ask_id}")
    public void deleteAsk(@PathVariable(name = "ask_id") int ask_id){
        askService.deleteAsks(ask_id);
    }

    @PostMapping("/ask/answer")
    public void answerAsk(Authentication authentication, @RequestBody AskDto askDto){
        askDto.setAdmi_id(Integer.parseInt(authentication.getName()));
        askService.answerAsks(askDto);
    }

    @PostMapping("/ask/list")
    public ResponseEntity<?> getAskList(Authentication authentication, @RequestBody AskCriteria askCriteria){

        //매니저 아니면 자기 것만 조회 가능
        if(!authentication.getAuthorities().toString().contains("ROLE_4")){
            askCriteria.setUser_id(Integer.parseInt(authentication.getName()));
        }
        return ResponseEntity.ok(askService.getAskList(askCriteria));
    }

    @GetMapping("/ask/{ask_id}")
    public ResponseEntity<?> getAsk(@PathVariable(name = "ask_id") int ask_id){
        return ResponseEntity.ok(askService.getAsk(ask_id));
    }
}
