package com.uos.cinemaseoul.common.auth;

public class MappingConstant {

    //로그인 없이 다 가능한 것들
    public static String[] All ={
            "/user/login",
            "/user/signup",
            "/user/login/non-member",
            "/user/phoneCheck",
            "/user/emailCheck",
            "/admin/signup",
            "/admin/login",
            "/admin/phoneCheck",
            "/admin/emailCheck"};

    //2 (비회원, 회원 둘다 가능)
    public static String[] NonUser = {
            "/adult",
    };

    //1 (회원 가능)
    public static String[] User = {
            "/user/{user_id}",
            "/user"};

    //4 (직원 가능 = 매너지도 가능)
    public static String[] Admin = {
            "/user/blacklist",
            "/admin/{admi_id}",
            "/admin"
    };

    //3 (매니저(높은 관리자만) 가능)
    public static String[] Manager = {
            "/admin/list",
    };
}
