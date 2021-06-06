package com.uos.cinemaseoul.controller.user;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.JwtTokenProvider;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.controller.admin.AdminController;
import com.uos.cinemaseoul.dto.user.*;
import com.uos.cinemaseoul.dto.user.admin.AdultCheckDto;
import com.uos.cinemaseoul.dto.user.user.NonMemberDto;
import com.uos.cinemaseoul.dto.user.user.UserFindDto;
import com.uos.cinemaseoul.dto.user.user.UserInfoDto;
import com.uos.cinemaseoul.dto.user.user.UserSignUpDto;
import com.uos.cinemaseoul.exception.BlackListException;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.service.user.BlackListService;
import com.uos.cinemaseoul.service.user.UsersService;
import com.uos.cinemaseoul.vo.user.BlackListVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Getter
    static class Result{
        String token;
        int user_id;

        public Result(String token, int user_id){
            this.token = token;
            this.user_id = user_id;
        }
    }

    //회원 로그인
    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody LoginDto logindto){
        AuthUser authUser = usersService.login(logindto);

        if(authUser == null){
            throw new NotFoundException("ID not found");
        }else if(!passwordEncoder.matches(logindto.getPassword(), authUser.getPassword())){
            throw new WrongArgException("Wrong Password");
        }
        String token = jwtTokenProvider.createToken(UserType.USERS.toString(),authUser.getUsername(), authUser.getAuth());
        return ResponseEntity.ok(new Result(token,Integer.parseInt(authUser.getUsername())));
    }

    //비회원가입
    @PostMapping("/login/non-member")
    public ResponseEntity<?> nonMemberlogin(@RequestBody NonMemberDto nonMemberDto){
        nonMemberDto.encodePassword(passwordEncoder.encode(nonMemberDto.getPassword()));
        AuthUser authUser = usersService.nonMemberCheck(nonMemberDto);
        String token = jwtTokenProvider.createToken(UserType.USERS.toString(),authUser.getUsername(), authUser.getAuth());
        return ResponseEntity.ok(new Result(token,Integer.parseInt(authUser.getUsername())));
    }

    //회원가입
    @PostMapping("/signup")
    public void signup(@RequestBody UserSignUpDto userSignupDto) {
        System.out.println("signupDto = " + userSignupDto.getUser_name());
        try{
            // 비밀번호 인코딩
            userSignupDto.encodePassword(passwordEncoder.encode(userSignupDto.getPassword()));
            usersService.signUp(userSignupDto);
        }
        //블랙리스트면
        catch (BlackListException e){
            throw e;
        }
        //그외 예외
        catch (Exception e){
            e.printStackTrace();
            throw new WrongArgException("Wrong SignUp Form");
        }
    }

    //회원정보
    @GetMapping("/{user_id}")
    public ResponseEntity<UserInfoDto> selectById(Authentication authentication, @PathVariable int user_id){

        //자기 id 아니면
        if(Integer.parseInt(authentication.getName()) != user_id) throw new DuplicateException();

        UserInfoDto userInfoDto;
        try{
            userInfoDto = usersService.selectById(user_id);
            if(userInfoDto == null){
                throw new NotFoundException("User not Found");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return ResponseEntity.ok(userInfoDto);
    }

    //회원수정
    @PutMapping("/update")
    public void updateUser(Authentication authentication, @RequestBody final UsersVo usr)throws Exception{

        //자기 id 아니면
        if(Integer.parseInt(authentication.getName()) != usr.getUser_id()) throw new DuplicateException();

        //비밀번호 있으면 암호화해서 저장
        if(usr.getPassword() != null){
            usr.setPassword(passwordEncoder.encode(usr.getPassword()));
        }
        try{
            int result = usersService.updateUser(usr);
            if(result == 0){
                throw new WrongArgException("Wrong Update Form");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    //회원탈퇴
    @DeleteMapping("/delete/{user_id}")
    public void deleteUser(Authentication authentication, @PathVariable(name = "user_id")int user_id)throws Exception{

        //자기 id 아니면
        if(Integer.parseInt(authentication.getName()) != user_id) throw new DuplicateException();

        try {
            int result = usersService.deleteUser(user_id);
            if(result == 0){
                throw new NotFoundException("User not Found");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    //성인인증
    @PostMapping("/adult")
    public void adultCheck(@RequestBody AdultCheckDto dto){
        try{
            boolean result;
            if(dto.getBirth() == null){
                result = usersService.adultCheck(dto.getPhone_num());
            }
            else{
                result = usersService.adultCheck(dto.getPhone_num(), dto.getBirth());
            }
            if(!result){
                throw new DuplicateException();
            }
        }catch (DuplicateException e){
            throw e;
        }
        catch (Exception e){
            throw new WrongArgException("Wrong args");
        }
    }

    //이메일검사
    @PostMapping(value = "/emailcheck")
    public void emailCheck(@RequestBody Map<String, String> email){
        usersService.emailCheck(email.get("email"));
    }

    //번호검사
    @PostMapping(value = "/phonecheck")
    public void phoneCheck(@RequestBody Map<String, String> phone_num){
        usersService.phoneCheck(phone_num.get("phone_num"));
    }

    //아이디찾기
    @PostMapping("/findId")
    public ResponseEntity<String> findId(@RequestBody UserFindDto userFindDto){
        return ResponseEntity.ok(usersService.findEmail(userFindDto));
    }

    //비밀번호재설정
    @PostMapping("/resetPw")
    public void resetPW(@RequestBody UserFindDto userFindDto){
        userFindDto.setPassword(passwordEncoder.encode(userFindDto.getPassword()));
        usersService.resetPassword(userFindDto);
    }

    //성인여부확인
    @GetMapping("/adult/{user_id}")
    public void checkAdult(@PathVariable(name = "user_id")int user_id){
        usersService.adultCheck(user_id);
    }
}
