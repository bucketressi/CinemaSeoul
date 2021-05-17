package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.dao.user.BlackListDao;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.dto.user.LoginDto;
import com.uos.cinemaseoul.dto.user.NonMemberDto;
import com.uos.cinemaseoul.dto.user.UserSignUpDto;
import com.uos.cinemaseoul.dto.user.UserInfoDto;
import com.uos.cinemaseoul.exception.BlackListException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.user.UsersVo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

@Service
@AllArgsConstructor
public class UsersService  {

    private final UsersDao usersDao;
    private final BlackListDao blackListDao;

    //로그인
    public AuthUser login(LoginDto loginDto) {
        AuthUser auth = new AuthUser();
        //이메일로 찾고
        UsersVo usr = usersDao.findByEmail(loginDto.getEmail());
        if (usr != null) {
            //있으면 세팅해서 넘기기
            return new AuthUser(usr.getUser_id(),UserType.USERS,usr.getUser_auth_code(), usr.getPassword());
        }
        return null;
    }

    //회원가입
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public int signUp(UserSignUpDto userSignupDto){
        //아이디, 번호 중복 한번 더 검사

        //블랙리스트인지 확인
        if(blackListDao.select(userSignupDto.getPhone_num(), userSignupDto.getUser_name()) != null){
             throw new BlackListException("black list");
        }

        UsersVo vo = new UsersVo().inputSignUp(userSignupDto);
        //회원가입
        usersDao.signUp(vo);
        return vo.getUser_id();
    }

    //번호조회
    public AuthUser nonMemberCheck(String phone_num){
        //번호로 조회
        UsersVo usr = usersDao.findByPhone(phone_num);

        //이미 있으면 세팅해서 넘기기
        if(usr != null){
            return new AuthUser(usr.getUser_id(),UserType.USERS,usr.getUser_auth_code(), usr.getPassword());
        }
        return null;
    }

    //비회원가입 장르
    @Transactional
    public AuthUser nonMemberSignUp(NonMemberDto nonMemberDto){

        //블랙리스트인지 확인
        if(blackListDao.select(nonMemberDto.getPhone_num(), nonMemberDto.getUser_name()) != null){
            throw new BlackListException("black list");
        }

        //없으면 가입 후 세팅해서 넘기기
        UsersVo nousr = UsersVo.builder()
                .user_name(nonMemberDto.getUser_name())
                .birth(nonMemberDto.getBirth())
                .phone_num(nonMemberDto.getPhone_num())
                .password(nonMemberDto.getPassword())
                //비회원 세팅
                .user_auth_code("100002")
                .agreement(nonMemberDto.getAgreement())
                .build();

        usersDao.nonMemberSignUp(nousr);
        return new AuthUser(nousr.getUser_id(),UserType.USERS, nousr.getUser_auth_code(), nousr.getPassword());
    }

    //회원 개인정보
    public UserInfoDto selectById(int user_id){
        return usersDao.selectById(user_id);
    }

    //회원정보 수정
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public int updateUser(UsersVo usr) throws Exception{

        //전화번호가 바뀌었으면
        if(!usersDao.findById(usr.getUser_id()).getPhone_num().equals(usr.getPhone_num())){
            //일단 전화번호 체크해서 중복인지 확인
            if(!phoneCheck(usr.getPhone_num())){
                throw new WrongArgException("전화번호 중복");
            }

       }else {
            //아니면 번호 아에 없애기
            usr.setPhone_num(null);
        }
        //1보다 더 많이 수정되어버리면
        int result = usersDao.updateUser(usr);

        if(result > 1){
            throw new Exception("too much updated");
        }

        return result;
    }

    //회원탈퇴
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public int deleteUser(int user_id) throws Exception{
        //1보다 더 많이 삭제되어버리면
        int result =usersDao.deleteUser(user_id);

        if(result > 1){
            throw new Exception("too much udpated");
        }

        return result;
    }

    //성인인증
    public boolean adultCheck(String phone_num){
        String birth = usersDao.adultCheck(phone_num);
        return adultCheck(phone_num,birth);
    }

    public boolean adultCheck(String phone_num, String birth){
        int age = Calendar.getInstance().get(Calendar.YEAR) - Integer.parseInt(birth)/10000;
        System.out.println(age + " " + Integer.parseInt(birth)/10000);
        return (age >= 19) ? true : false;
    }

    //번호 검사
    public boolean phoneCheck(String phone){
        return usersDao.findByPhone(phone) != null ? false : true;
    }


    //이메일 검사
    public boolean emailCheck(String email){
        return usersDao.findByEmail(email) != null ? false : true;
    }


}
