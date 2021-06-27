package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.mapper.UsersMapper;
import com.uos.cinemaseoul.dao.user.BlackListDao;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.dto.user.*;
import com.uos.cinemaseoul.dto.user.user.NonMemberDto;
import com.uos.cinemaseoul.dto.user.user.UserFindDto;
import com.uos.cinemaseoul.dto.user.user.UserInfoDto;
import com.uos.cinemaseoul.dto.user.user.UserSignUpDto;
import com.uos.cinemaseoul.exception.BlackListException;
import com.uos.cinemaseoul.exception.DuplicateException;
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
    private final UsersMapper usersMapper;

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

        UsersVo vo = usersDao.findByPhone(userSignupDto.getPhone_num());

        //비회원으로 이용한적이 없으면 -> 일반 회원가입 절차
        if(vo == null){
            //아이디, 번호 중복 한번 더 검사
            if(usersDao.findByEmailAndPhone(userSignupDto.getEmail(), userSignupDto.getPhone_num()) != null){
                throw new DuplicateException("unavailable email");
            }

            //블랙리스트인지 확인
            if(blackListDao.select(userSignupDto.getPhone_num()) != null){
                throw new BlackListException("black list");
            }
            UsersVo s = new UsersVo().inputSignUp(userSignupDto);
            //회원가입
            usersDao.signUp(s);
            return s.getUser_id();
        }
        //회원이었으면 회원 업그레이드
        else{

            if(vo.getUser_auth_code().equals("100001")) throw new DuplicateException("already member");

            //비회원이었으면 계속 진행
            UsersVo usersVo = new UsersVo().inputSignUp(userSignupDto);
            usersVo.setUser_id(vo.getUser_id()); //아이디도 세팅
            usersDao.nonMemberUpgrade(usersVo);
            return usersVo.getUser_id();
        }



    }

    //비회원조회
    @Transactional
    public AuthUser nonMemberCheck(NonMemberDto nonMemberDto){
        //번호로 조회
        UsersVo usr = usersDao.findByPhone(nonMemberDto.getPhone_num());

        //이미 있으면 세팅해서 넘기기
        if(usr != null){
            return new AuthUser(usr.getUser_id(),UserType.USERS,usr.getUser_auth_code(), usr.getPassword());
        }

        //없을때
        //블랙리스트인지 확인
        if(blackListDao.select(nonMemberDto.getPhone_num()) != null){
            throw new BlackListException("black list");
        }

        //없으면 가입 후 세팅해서 넘기기
        UsersVo nousr = UsersVo.builder()
                .user_name(nonMemberDto.getUser_name())
                .birth(nonMemberDto.getBirth())
                .phone_num(nonMemberDto.getPhone_num())
                .password(nonMemberDto.getPassword())
                //비회원 세팅
                .user_auth_code(ConstantTable.USER_AUTH_NONMEMBER)
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
    /***이름 바뀌면, 참조무결성 제약조건을 만족하기 위해 -> ASK의 이름도 변경해야함***/
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public int updateUser(UsersVo usr) throws Exception{

        //전화번호가 바뀌었으면
        if(!usersDao.findById(usr.getUser_id()).getPhone_num().equals(usr.getPhone_num())){
            //일단 전화번호 체크해서 중복인지 확인
            if(usersDao.findByPhone(usr.getPhone_num()) != null){
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
    /***회원 탈퇴하면, 참조무결성 제약조건을 만족하기 위해 -> BOOKPAY, PRODUCTPAY에 슈퍼유저 0으로 설정**/
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public int deleteUser(int user_id) throws Exception{

        //삭제할때 연관된 예매결제 - 상품결제 항목의 id 슈퍼유저로 변환
        usersDao.setBookPayDefault(user_id);
        usersDao.setProductPayDefault(user_id);

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
        if(age>=19){
            usersDao.updateAdult(phone_num);
            return true;
        }
        else{
            return false;
        }
    }

    //번호 검사
    public void phoneCheck(String phone){
        if(usersDao.findByPhone(phone) != null){
            throw new DuplicateException();
        }
    }


    //이메일 검사
    public void emailCheck(String email){
        if(usersDao.findByEmail(email) != null){
            throw new DuplicateException();
        }
    }


    //아이디 찾기
    public String findEmail(UserFindDto userFindDto){
        UsersVo usersVo = usersMapper.insertIntoUserFindToUsersVo(userFindDto);
        String email = usersDao.findByPhoneAndName(usersVo);

        if(email == null) throw new DuplicateException("no email available");

        return email;
    }

    //비밀번호 재설정
    public void resetPassword(UserFindDto userFindDto){
        UsersVo usersVo = usersMapper.insertIntoUserFindToUsersVo(userFindDto);
        if(usersDao.findByEmailAndPhone(usersVo.getEmail(), usersVo.getPhone_num()) == null)
            throw new DuplicateException("no available email");

        usersDao.resetPassword(usersVo);
    }

    //성인인증 여부 확인
    public void adultCheck(int user_id) {
        if(usersDao.adultState(user_id) != 1){
            throw new DuplicateException();
        }
    }
}
