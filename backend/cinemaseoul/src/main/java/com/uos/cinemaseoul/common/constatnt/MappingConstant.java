package com.uos.cinemaseoul.common.constatnt;

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
            "/admin/emailCheck",

            "/movie/{movi_id}",
            "/movie/search",
            "/movie/list",
            "/movie/genre/list"
    };

    //2 (비회원, 회원 둘다 가능)
    public static String[] NonUser = {
            "/adult",
    };

    //1 (회원 가능)
    public static String[] User = {
            "/user",
            "/user/{user_id}",
            "/user/delete",
            "/user/update",

            "/point/{user_id}/{start_date}"
    };

    //4 (직원 가능 = 매너지도 가능)
    public static String[] Admin = {
            "/user/blacklist",
            "/admin/{admi_id}",
            "/admin/update",

            "/movie/update",
            "/movie/add",
            "/movie/delete",

            "/point/update",
            "/point/{user_id}/{start_date}",

            "/hall/{hall_id}",
    };

    //3 (매니저(높은 관리자만) 가능)
    public static String[] Manager = {
            "/admin/list",
            "/admin/delete",
            "/admin",

            "/hall",
            "/hall/seat"
    };
}
