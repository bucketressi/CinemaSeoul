package com.uos.cinemaseoul.common.constatnt;

public class MappingConstant {

    //로그인 없이 다 가능한 것들
    public static String[] All ={
            "/user/login",
            "/user/signup",
            "/user/login/non-member",
            "/user/phonecheck",
            "/user/emailcheck",
            "/user/findId",
            "/user/resetPw",

            "/admin/signup",
            "/admin/login",
            "/admin/phonecheck",
            "/admin/emailcheck",
            "/admin/findId",
            "/admin/resetPw",

            "/movie/{movi_id}",
            "/movie/search",
            "/movie/list",
            "/movie/genre/list",

            "/showschedule/list",

            "/book/movie",
            "/book/schedule",

            "/prod/{prod_id}",
            "/prod/list",

            "/people/search",
            "/people/list",
            "/people/{peop_id}"
    };

    //2 (비회원, 회원 둘다 가능)
    public static String[] NonUser = {
            "/adult",
            "/user/delete/{user_id}",

            "/pay/book",
            "/pay/product"
    };

    //1 (회원 가능)
    public static String[] User = {
            "/user",
            "/user/{user_id}",
            "/user/update",

            "/review",
            "/review/delete/{user_id}/{movi_id}",
            "/mymovie/{user_id}"
    };

    //4 (직원 가능 = 매너지도 가능)
    public static String[] Admin = {

            "/blacklist",
            "/blacklist/delete/{phone_num}",

            "/admin/{admi_id}",
            "/admin/update",

            "/movie/update",
            "/movie/updateGenre",
            "/movie/updateCast",
            "/movie/add",
            "/movie/delete/{movi_id}",

            "/point/update",

            "/hall/{hall_id}",

            "/showschedule",
            "/showschedule/{show_id}/book",
            "/showschedule/add",
            "/showschedule/delete/{show_id}",

            "/prod",
            "/prod/image",
            "/prod/delete/{prod_id}",

            "/people/add",
            "/people/",
            "/people/image",
            "/people/delete/{peop_id}"
    };

    //3 (매니저(높은 관리자만) 가능)
    public static String[] Manager = {
            "/admin/list",
            "/admin/delete/{admi_id}",
            "/admin",

            "/hall",
            "/hall/delete/{hall_id}",
            "/hall/seat"
    };

    //5 (직원, 매니저, 회원, 비회원 모두 가능)
    public static String[] AllUser = {

            "/book/list",
            "/book/{book_id}",
            "/book/{show_id}/seat",
            "/book/cancel/{book_id}",

            "/point/{user_id}/{start_date}",

            "/product/cancel/{prod_pay_id}"

    };
}
