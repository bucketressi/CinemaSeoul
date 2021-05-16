package com.uos.cinemaseoul.controller.user;


import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.JwtTokenProvider;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dto.user.AdminInfoDto;
import com.uos.cinemaseoul.dto.user.AdminListDto;
import com.uos.cinemaseoul.dto.user.AdminSignUpDto;
import com.uos.cinemaseoul.dto.user.LoginDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.service.user.AdminService;
import com.uos.cinemaseoul.vo.user.AdminVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public String login(@RequestBody LoginDto logindto){
        AuthUser authUser = adminService.login(logindto);

        if(authUser == null){
            throw new NotFoundException("ID not found");
        }else if(!passwordEncoder.matches(logindto.getPassword(), authUser.getPassword())){
            throw new WrongArgException("Wrong Password");
        }
        return jwtTokenProvider.createToken(UserType.ADMIN.toString(), authUser.getUsername(), authUser.getAuth());
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
        if(!authentication.getAuthorities().contains("ROLE_3")
                && Integer.parseInt(authentication.getName()) != adv.getAdmi_id()) throw new DuplicateException();

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
        if(!authentication.getAuthorities().contains("ROLE_3")
                && Integer.parseInt(authentication.getName()) != admi_id ) throw new DuplicateException();


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
    @DeleteMapping("/{admi_id}")
    public void deleteUser(Authentication authentication, @PathVariable int admi_id)throws Exception{
        //매니저도 아니고, 자기 id도 아니면
        if(!authentication.getAuthorities().contains("ROLE_3")
                && Integer.parseInt(authentication.getName()) != admi_id ) throw new DuplicateException();

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
    public void phoneCheck(@ModelAttribute(name = "phone_num") String phone_num){
        if(!adminService.phoneCheck(phone_num)){
            throw new DuplicateException();
        }
    }

    //이메일검사
    @PostMapping("/emailcheck")
    public void emailCheck(@ModelAttribute(name = "email") String email){
        if(!adminService.emailCheck(email)){
            throw new DuplicateException();
        }
    }
}
