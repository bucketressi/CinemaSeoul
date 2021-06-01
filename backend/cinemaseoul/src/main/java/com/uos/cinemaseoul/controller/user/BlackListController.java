package com.uos.cinemaseoul.controller.user;

import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.service.user.BlackListService;
import com.uos.cinemaseoul.vo.user.BlackListVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BlackListController {

    private final BlackListService blackListService;

    //블랙리스트 입력
    @PostMapping("/blacklist")
    public void insertBlacklist(@RequestBody BlackListVo blackListVo){
        try{
            blackListService.addBlackList(blackListVo);
        }catch (Exception e){
            throw new WrongArgException("Wrong args");
        }
    }

    //블랙리스트 삭제
    @DeleteMapping("/blacklist")
    public void deleteBlacklist(@RequestBody Map<String, String> map){
        blackListService.deleteBlackList(map.get("phone_num"));
    }

    //블랙리스트 조회
    @GetMapping("/blacklist")
    public ResponseEntity<?> getBlackList(){
        return ResponseEntity.ok(blackListService.getBlackList());
    }

    //블랙리스트 수정
    @PutMapping("/blacklist")
    public void updateBlacklist(@RequestBody BlackListVo vo){
        blackListService.updateBlackList(vo);
    }
}
