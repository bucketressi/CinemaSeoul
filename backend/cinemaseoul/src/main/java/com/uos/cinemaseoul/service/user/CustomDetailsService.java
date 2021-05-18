package com.uos.cinemaseoul.service.user;

import com.uos.cinemaseoul.common.auth.AuthUser;
import com.uos.cinemaseoul.common.auth.UserType;
import com.uos.cinemaseoul.dao.user.AdminDao;
import com.uos.cinemaseoul.dao.user.UsersDao;
import com.uos.cinemaseoul.vo.user.AdminVo;
import com.uos.cinemaseoul.vo.user.UsersVo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomDetailsService implements UserDetailsService {

    private final UsersDao usersDao;
    private final AdminDao adminDao;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        return null;
    }

    public UserDetails loadUserByUsername(String type, String id) throws UsernameNotFoundException {

        System.out.println("type = " + type + " id = " + id);

        //사용자일때
        if(type.equals(UserType.USERS.toString())){
            UsersVo vo = usersDao.findById(Integer.parseInt(id));
            return new AuthUser(vo.getUser_id(), UserType.USERS, vo.getUser_auth_code(), vo.getPassword());
        }
        else{
            //관리자일때
            AdminVo vo = adminDao.findById(Integer.parseInt(id));
            return new AuthUser(vo.getAdmi_id(),UserType.ADMIN, vo.getAdmi_auth_code(), vo.getPassword());
        }
    }

}
