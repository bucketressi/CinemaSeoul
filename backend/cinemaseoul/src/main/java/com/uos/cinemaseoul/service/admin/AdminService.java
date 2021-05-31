package com.uos.cinemaseoul.service.admin;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.common.mapper.AdminMapper;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.dao.user.AdminDao;
import com.uos.cinemaseoul.dto.user.*;
import com.uos.cinemaseoul.dto.user.admin.AdminFindDto;
import com.uos.cinemaseoul.dto.user.admin.AdminInfoDto;
import com.uos.cinemaseoul.dto.user.admin.AdminListDto;
import com.uos.cinemaseoul.dto.user.admin.AdminSignUpDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.admin.AdminVo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AdminService {

    private final AdminDao adminDao;
    private final AdminMapper adminMapper;

    //로그인
    public AuthUser login(LoginDto loginDto) {
        AuthUser auth = new AuthUser();
        //이메일로 찾고
        AdminVo adm = adminDao.findByEmail(loginDto.getEmail());
        if (adm != null) {
            //있으면 세팅해서 넘기기
            return new AuthUser(adm.getAdmi_id(), UserType.ADMIN,adm.getAdmi_auth_code(), adm.getPassword());
        }
        return null;
    }

    //회원가입
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public void signUp(AdminSignUpDto adminSignUpDto){
        AdminVo adv = new AdminVo().inputSignUp(adminSignUpDto);

        //email, 번호 중복 검사
        if(adminDao.findByEmailAndPhone(adv.getEmail(), adv.getPhone_num()) != null){
            throw new DuplicateException();
        }

        adminDao.signUp(adv);
    }

    //개인정보
    public AdminInfoDto selectById(int admi_id){
        return adminDao.selectAdmin(admi_id);
    }

    //리스트 조회
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public AdminListDto selectList(Criteria criteria){
        AdminListDto adminListDto = new AdminListDto();
        //페이지 계산
        int totalCount = adminDao.countList();
        int totalPage =  totalCount / criteria.getAmount();
        if(totalCount % criteria.getAmount() > 0){
            totalPage++;
        }

        //total page
        adminListDto.setPageInfo(totalPage, criteria.getPage(), criteria.getAmount());
        adminListDto.setAdminListInfoDtoList(adminDao.selectAdminList(criteria));

        return adminListDto;
    }


    //수정
    /***이름 바뀌면, 참조무결성 제약조건을 만족하기 위해 -> ASK, FAQ, NOTICE, EVENT에서의 이름도 변경해야함***/
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public int updateAdmin(AdminVo adv) throws Exception{

        //전화번호가 바뀌었으면
        if(!adminDao.findById(adv.getAdmi_id()).getPhone_num().equals(adv.getPhone_num())){

            //일단 전화번호 체크해서 중복인지 확인
            if(!phoneCheck(adv.getPhone_num())){
                throw new WrongArgException("전화번호 중복");
            }

        }else {
            //아니면 번호 아에 없애기
            adv.setPhone_num(null);
        }
        //1보다 더 많이 수정되어버리면
        int result = adminDao.updateAdmin(adv);
        if(result > 1){
            throw new Exception("too much updated");
        }
        return result;
    }

    //탈퇴
    @Transactional(rollbackFor = {Exception.class, Error.class})
    public int deleteAdmin(int admi_id) throws Exception{

        //1보다 더 많이 삭제되어버리면
        int result =adminDao.deleteAdmin(admi_id);

        if(result > 1){
            throw new Exception("too much udpated");
        }

        return result;
    }

    //번호 검사
    public boolean phoneCheck(String phone){
        return adminDao.findByPhone(phone) != null ? false : true;
    }


    //이메일 검사
    public boolean emailCheck(String email){
        return adminDao.findByEmail(email) != null ? false : true;
    }

    //아이디 찾기
    public String findEmail(AdminFindDto adminFindDto){
        AdminVo adminVo = adminMapper.insertIntoAdminFindToAdminVo(adminFindDto);
        String email = adminDao.findByPhoneAndName(adminVo);

        if(email == null) throw new DuplicateException("no email available");

        return email;
    }

    //비밀번호 재설정
    @Transactional
    public void resetPassword(AdminFindDto adminFindDto){
        AdminVo adminVo = adminMapper.insertIntoAdminFindToAdminVo(adminFindDto);

        if(adminDao.findByPhoneAndName(adminVo) == null) throw new DuplicateException("no email available");
        if(adminDao.resetPassword(adminVo) > 1){
            throw new WrongArgException("error occurs");
        }
    }


}
