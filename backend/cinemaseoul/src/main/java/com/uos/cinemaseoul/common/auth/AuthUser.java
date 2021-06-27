package com.uos.cinemaseoul.common.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Builder
@Component
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser implements UserDetails {

    private int id;
    private List<String> auth = new ArrayList<>();
    private UserType userType;
    private String password;

    public AuthUser(int id, UserType userType,String auth_code, String password){
        this.id = id;
        int c = Integer.parseInt(auth_code);
        auth = new ArrayList<>();
        this.userType = userType;

        if(userType.equals(UserType.USERS)){
            c = c - 100000;
            for(int i=2; i>=c; i--){
                auth.add("ROLE_"+i);
            }
        }
        else{
            c = c - 120000;
            for(int i=4; i>=c+2; i--){
                auth.add("ROLE_"+i);
            }
        }
        this.password = password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.auth.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return Integer.toString(id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
