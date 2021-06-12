package com.uos.cinemaseoul.common.config;

import com.uos.cinemaseoul.common.auth.JwtAuthenticationFilter;
import com.uos.cinemaseoul.common.auth.JwtTokenProvider;
import com.uos.cinemaseoul.common.auth.MappingConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    String[] s = new String[10];
	private final JwtTokenProvider jwtTokenProvider;
    // 암호화에 필요한 PasswordEncoder 를 Bean 등록합니다.

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // authenticationManager를 Bean 등록합니다.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// We don't need CSRF for this example
		httpSecurity
                .csrf().disable()
                .httpBasic().disable()
                // 토큰 기반 인증이므로 세션 X
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
                .and()
				// don`t authenticate this particular request
				.authorizeRequests()

                //로그인 없이 다 가능한 것들
                .antMatchers(MappingConstant.All).permitAll()

                //2 (비회원, 회원 둘다 가능)
                .antMatchers(MappingConstant.NonUser).hasAnyRole("2","1")

                //1 (회원 가능)
                .antMatchers(MappingConstant.User).hasRole("1")

                //4 (직원 가능 = 매너지도 가능)
                .antMatchers(MappingConstant.Admin).hasAnyRole("3","4")

                //3 (매니저(높은 관리자) 가능)
                .antMatchers(MappingConstant.Manager).hasAnyRole("4")



                .and()
                .cors()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);
	}

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8081","http://localhost:3000" ));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("TOKEN", "content-type", "filter"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}