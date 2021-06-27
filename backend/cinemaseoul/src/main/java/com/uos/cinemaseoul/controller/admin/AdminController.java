package com.uos.cinemaseoul.controller.admin;


import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.JwtTokenProvider;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.user.LoginDto;
import com.uos.cinemaseoul.dto.user.admin.AdminFindDto;
import com.uos.cinemaseoul.dto.user.admin.AdminInfoDto;
import com.uos.cinemaseoul.dto.user.admin.AdminListDto;
import com.uos.cinemaseoul.dto.user.admin.AdminSignUpDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.service.admin.AdminService;
import com.uos.cinemaseoul.vo.admin.AdminVo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Getter
    static class Result{
        String token;
        int admi_id;

        public Result(String token, int user_id){
            this.token = token;
            this.admi_id = user_id;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Result> login(@RequestBody LoginDto logindto){
        AuthUser authUser = adminService.login(logindto);

        if(authUser == null){
            throw new NotFoundException("ID not found");
        }else if(!passwordEncoder.matches(logindto.getPassword(), authUser.getPassword())){
            throw new WrongArgException("Wrong Password");
        }
        String token = jwtTokenProvider.createToken(UserType.ADMIN.toString(),authUser.getUsername(), authUser.getAuth());
        return ResponseEntity.ok(new Result(token,Integer.parseInt(authUser.getUsername())));
    }

    @PostMapping("/signup")
    public void signup(@RequestBody AdminSignUpDto adminSignUpDto) {

        try{
            // 비밀번호 인코딩
            adminSignUpDto.encodePassword(passwordEncoder.encode(adminSignUpDto.getPassword()));
            adminService.signUp(adminSignUpDto);
        }
        //아이디 중복이면
        catch (DuplicateException e){
            throw e;
        }
        //그외 예외
        catch (Exception e){
            e.printStackTrace();
            throw new WrongArgException("Wrong SignUp Form");
        }
    }

    //관리자 수정
    @PutMapping("/update")
    public void updateAdmi(Authentication authentication, @RequestBody final AdminVo adv)throws Exception{

        //매니저도 아니고, 자기 id도 아니면
        if((!authentication.getAuthorities().toString().contains("ROLE_4"))
                && Integer.parseInt(authentication.getName()) != adv.getAdmi_id()){

            throw new DuplicateException("에러");
        }

        //비밀번호 있으면 암호화해서 저장
        if(adv.getPassword() != null){
            adv.setPassword(passwordEncoder.encode(adv.getPassword()));
        }

        try{
            int result = adminService.updateAdmin(adv);
            if(result == 0){
                throw new WrongArgException("Wrong Update Form");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    //리스트 조회
    @PostMapping("/list")
    public ResponseEntity<AdminListDto> selectList(@RequestBody Criteria criteria){
        return ResponseEntity.ok(adminService.selectList(criteria));

    }

    //관리자 세부 조회
    @GetMapping("/{admi_id}")
    public ResponseEntity<AdminInfoDto> selectById(Authentication authentication, @PathVariable int admi_id){

        //매니저도 아니고, 자기 id도 아니면
        if( (!authentication.getAuthorities().toString().contains("ROLE_4") )
                && Integer.parseInt(authentication.getName()) != admi_id )
            throw new DuplicateException();


        AdminInfoDto adminInfoDto;
        try{
            adminInfoDto = adminService.selectById(admi_id);
            if(adminInfoDto == null){
                throw new NotFoundException("User not Found");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return ResponseEntity.ok(adminInfoDto);
    }

    //관리자탈퇴
    @DeleteMapping("/delete/{admi_id}")
    public void deleteUser(Authentication authentication, @PathVariable(name = "movi_id") int admi_id)throws Exception{

        //매니저도 아니고, 자기 id도 아니면
        if(!authentication.getAuthorities().toString().contains("ROLE_4")
                && Integer.parseInt(authentication.getName()) !=  admi_id) throw new DuplicateException();

        try {
            int result = adminService.deleteAdmin(admi_id);
            if(result == 0){
                throw new NotFoundException("Admin not Found");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    //번호검사
    @PostMapping("/phonecheck")
    public void phoneCheck(@RequestBody Map<String, String> phone_num){
        if(!adminService.phoneCheck(phone_num.get("phone_num"))){
            throw new DuplicateException();
        }
    }

    //이메일검사
    @PostMapping("/emailcheck")
    public void emailCheck(@RequestBody Map<String, String> email){
        if(!adminService.emailCheck(email.get("email"))){
            throw new DuplicateException();
        }
    }

    //아이디찾기
    @PostMapping("/findId")
    public ResponseEntity<String> findId(@RequestBody AdminFindDto adminFindDto){
        return ResponseEntity.ok(adminService.findEmail(adminFindDto));
    }

    //비밀번호재설정
    @PostMapping("/resetPw")
    public void resetPW(@RequestBody AdminFindDto adminFindDto){
        adminFindDto.setPassword(passwordEncoder.encode(adminFindDto.getPassword()));
        adminService.resetPassword(adminFindDto);
    }
}
