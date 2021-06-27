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

            "/movie/select/{movi_id}",
            "/movie/search",
            "/movie/list",
            "/movie/genre/list",

            "/show/list",

            "/book/movie",
            "/book/schedule",

            "/prod/select/{prod_id}",
            "/prod/list",

            "/people/search",
            "/people/list",
            "/people/select/{peop_id}",

            "/faq/select/{faq_id}",
            "/faq/list",

            "/notice/select/{noti_id}",
            "/notice/list",

            "/event/list",
            "/event/select/{event_id}",
    };

    //2 (비회원, 회원 둘다 가능)
    public static String[] NonUser = {
            "/user/adult",
            "/user/adult/{user_id}",
            "/user/delete/{user_id}",

            "/point/select/{user_id}",

            "/pay/book",
            "/pay/product",
            "/showschedule/select/{show_id}"
    };

    //1 (회원 가능)
    public static String[] User = {
            "/user",
            "/user/{user_id}",
            "/user/update",

            "/review",
            "/review/delete/{user_id}/{movi_id}",
            "/mymovie/{user_id}",

            "/ask/add",
            "/ask/update",

            "/usertyperecord/{user_id}"
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
            "/movie/image/{movi_id}",

            "/showschedule/add",
            "/showschedule/{show_id}/book",
            "/showschedule/delete/{show_id}",
            "/showschedule/update",
            "/showschedule/start/{show_id}",
            "/showschedule/cancel/{show_id}",

            "/point/update",

            "/hall/select/{hall_id}",

            "/prod",
            "/prod/image/{prod_id}",
            "/prod/delete/{prod_id}",

            "/people/add",
            "/people/update",
            "/people/image/{peop_id}",
            "/people/delete/{peop_id}",

            "/record",
            "/sales",
            "/sales/update",

            "/faq/add",
            "/faq/update",
            "/faq/delete/{faq_id}",

            "/ask/answer",

            "/notice/add",
            "/notice/update",
            "/notice/delete/{noti_id}",

            "/event/add",
            "/event/update",
            "/event/image/{event_id}",
            "/event/delete/{event_id}"

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

            "/product/cancel/{prod_pay_id}",
            "/pay/book/list",
            "/pay/product/list",

            "/ask/list",
            "/ask/{ask_id}",
            "/ask/delete/{ask_id}",

            "/pay/use/book",
            "/pay/use/product"

    };
}
