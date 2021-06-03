package com.uos.cinemaseoul.dao.product;

import com.uos.cinemaseoul.common.paging.PayListCriteria;
import com.uos.cinemaseoul.dto.product.productpay.ProductInfoShortDto;
import com.uos.cinemaseoul.dto.product.productpay.ProductPayInfoDto;
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

    //코드 사용
    void useCode(String use_code, String pay_state_fin);
    ProductPayVo selectProductPay(String use_code);

    //조회
    int countList(PayListCriteria payListCriteria);
    List<ProductPayInfoDto> selectProductPayList(PayListCriteria payListCriteria);
    List<ProductInfoShortDto> selectProductPayInfo(int prod_pay_id);
}
