package com.uos.cinemaseoul;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

@SpringBootApplication
@MapperScan(basePackages = "com.uos.cinemaseoul", annotationClass = Mapper.class)
public class CinemaseoulApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaseoulApplication.class, args);
    }
}
