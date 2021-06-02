package com.uos.cinemaseoul.dao.product;

import com.uos.cinemaseoul.vo.product.ProductPayInfoVo;
import com.uos.cinemaseoul.vo.product.ProductPayVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductPayDao {

    void insertProductPay(ProductPayVo productPayVo);
    void updateProductLimit(int prod_id, int amount);
    //상품 개수
    int getProductLimit(int prod_id);
    void insertProductPayInfo(List<ProductPayInfoVo> products);

    //결제 취소
    ProductPayVo getCancelInfo(int prod_pay_id);
    void setCancel(int prod_pay_id, String pay_state_cancel);
    //결제상세 리스트 원복
    List<ProductPayInfoVo> getProductPayInfo(int prod_pay_id);
    void updateProductLimitBack(int prod_id, int amount);
}
