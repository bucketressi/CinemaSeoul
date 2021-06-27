package com.uos.cinemaseoul.vo.product;


import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
public class ProductPayVo {
    private int prod_pay_id;
    private int user_id;
    private int use_point;
    private int price;
    private String pay_type_code;
    private String pay_state_code;
    private int accu_point;
    private String pay_datetime;
    private String use_datetime;

    //MD5 after 16bytes
    private String use_code;

    public void createCode(String code){
        this.use_code = code;
    }
    public void calAccu_point(int ratio){
        this.accu_point = (this.price * ratio) / 100;
    }
}
