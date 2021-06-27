package com.uos.cinemaseoul.service.product;

import com.uos.cinemaseoul.common.constatnt.ConstantTable;
import com.uos.cinemaseoul.common.constatnt.MD5;
import com.uos.cinemaseoul.common.mapper.ProductPayMapper;
import com.uos.cinemaseoul.common.paging.PayListCriteria;
import com.uos.cinemaseoul.dao.product.ProductDao;
import com.uos.cinemaseoul.dao.product.ProductPayDao;
import com.uos.cinemaseoul.dao.user.PointDao;
import com.uos.cinemaseoul.dto.book.bookpay.BookPayListDto;
import com.uos.cinemaseoul.dto.product.productpay.ProductPayInfoDto;
import com.uos.cinemaseoul.dto.product.productpay.ProductPayInsertDto;
import com.uos.cinemaseoul.dto.product.productpay.ProductPayListDto;
import com.uos.cinemaseoul.exception.DuplicateException;
import com.uos.cinemaseoul.exception.NotAllowedException;
import com.uos.cinemaseoul.exception.NotFoundException;
import com.uos.cinemaseoul.service.user.PointService;
import com.uos.cinemaseoul.vo.book.BookPayVo;
import com.uos.cinemaseoul.vo.product.ProductPayInfoVo;
import com.uos.cinemaseoul.vo.product.ProductPayVo;
import com.uos.cinemaseoul.vo.user.PointVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.uos.cinemaseoul.common.constatnt.ConstantTable.*;

@Service
@RequiredArgsConstructor
public class ProductPayService {

    private final ProductPayDao productPayDao;
    private final ProductPayMapper productPayMapper;
    private final PointDao pointDao;
    private final PointService pointService;



    @Transactional
    public void productPay(ProductPayInsertDto productPayInsertDto) {
        ProductPayVo productPayVo = productPayMapper.insertIntoProdPayVoFromInsertDto(productPayInsertDto);

        int pointRatio = 0;
        //유저등급에 따라 적립포인트 다름
        String user_code = pointDao.getUserCode(productPayInsertDto.getUser_id());
        pointRatio = ConstantTable.getPointRatio(user_code);
        productPayVo.calAccu_point(pointRatio);

        try{
            //시스템의 나노초로 사용코드 발급
            productPayVo.createCode(MD5.makeCode(Long.toString(System.nanoTime())));
            //예매 결제 insert
            productPayDao.insertProductPay(productPayVo);
        }
        //만약 에러 발생시 (충돌시) 다시 한번 더
        catch (Exception e){
            productPayVo.createCode(MD5.makeCode(Long.toString(System.nanoTime())));
            productPayDao.insertProductPay(productPayVo);
        }

        //포인트 사용했으면, 사용한 것도 추가
        if(productPayVo.getUse_point() != 0){
            pointService.updatePoint(productPayVo.getUser_id(),
                    productPayVo.getAccu_point(),
                    ConstantTable.POINT_CODE_USE,
                    "상품 구매 시 "+productPayVo.getAccu_point()+"포인트 사용");
        }

        //결제 금액이 있으면 추가
        if(productPayVo.getPrice() > 0){
            pointService.updatePoint(productPayVo.getUser_id(),
                    productPayVo.getAccu_point(),
                    ConstantTable.POINT_CODE_ADD,
                    "상품 구매로 인한" +productPayVo.getPrice()+" 원 결제, 회원등급에 따라 "+pointRatio+"% 적립");
        }

        //상품 세부정보 Insert
        List<ProductPayInfoVo> products = productPayInsertDto.getProductInfo()
                .stream()
                .map(o -> new ProductPayInfoVo(productPayVo.getProd_pay_id(),
                        o.getProd_id(), o.getAmount(), o.getPrice()))
                .collect(Collectors.toList());


        //개수 수정
        for (ProductPayInfoVo vo: products) {
            productPayDao.updateProductLimit(vo.getProd_id(), vo.getAmount());
            if(productPayDao.getProductLimit(vo.getProd_id()) < 0){
                throw new NotAllowedException("NO AVAILABLE STOCKS IN" + vo.getProd_name());
            }
        }
        //개수가 다 잘 수정되면 Info 삽입
        productPayDao.insertProductPayInfo(products);
    }

    @Transactional
    //상품결제 취소
    public void cancelProductPay(int prod_pay_id) {

        //결제ID, 사용 포인트, 적립 포인트 받아오기
        ProductPayVo productPayVo = productPayDao.getCancelInfo(prod_pay_id);

        //만약 이미 사용되었거나, 취소된거면 결제 취소 안되게
        if(productPayVo.getPay_state_code().equals(PAY_STAT_CANCEL)){
            throw new NotAllowedException("Already Canceld");
        }

        if(productPayVo.getPay_state_code().equals(PAY_STAT_FIN)){
            throw new DuplicateException("Already Used");
        }

        //사용 포인트가 있으면
        if(productPayVo.getUse_point() > 0){
            pointService.updatePoint(productPayVo.getUser_id(),
                    productPayVo.getUse_point(),
                    POINT_CODE_NOTUSE,
                    "예매 취소로 인한 사용 포인트 재적립");
        }

        //
        if(productPayVo.getAccu_point() > 0){
            pointService.updatePoint(productPayVo.getUser_id(),
                    productPayVo.getAccu_point(),
                    POINT_CODE_NOTADD,
                    "예매 취소로 인한 적립 포인트 취소");
        }

        //개수 원복
        List<ProductPayInfoVo> products = productPayDao.getProductPayInfo(productPayVo.getProd_pay_id());
        for(ProductPayInfoVo vo : products){
            productPayDao.updateProductLimitBack(vo.getProd_id(), vo.getAmount());
        }

        //make
        productPayDao.setCancel(prod_pay_id, PAY_STAT_CANCEL);

    }

    //코드 사용
    @Transactional
    public void useProductCode(String use_code) {

        ProductPayVo vo = productPayDao.selectProductPay(use_code);

        if(vo == null){
            throw new NotFoundException("not founded Code");
        }

        //이미 사용
        if(vo.getUse_datetime() != null && vo.getPay_state_code().equals(PAY_STAT_FIN)){
            throw new DuplicateException("Already Used");
        }
        //사용불가 OR 취소
        else if(vo.getPay_state_code().equals(PAY_STAT_FIN) || vo.getPay_state_code().equals(PAY_STAT_CANCEL)){
            throw new NotAllowedException("Not Allowed Code");
        }

        productPayDao.useCode(use_code, ConstantTable.PAY_STAT_FIN);
    }

    @Transactional
    public ProductPayListDto getList(PayListCriteria payListCriteria) {
        ProductPayListDto productPayListDto = new ProductPayListDto();
        //페이지 계산
        int totalCount = productPayDao.countList(payListCriteria);
        int totalPage =  totalCount / payListCriteria.getAmount();
        if(totalCount % payListCriteria.getAmount() > 0){
            totalPage++;
        }

        productPayListDto.setProdpayinfo(productPayDao.selectProductPayList(payListCriteria));

        for(ProductPayInfoDto pd : productPayListDto.getProdpayinfo()){
            pd.setProductPayDetails(productPayDao.selectProductPayInfo(pd.getProd_pay_id()));
        }

        productPayListDto.setPageInfo(totalPage, payListCriteria.getPage(), payListCriteria.getAmount());
        return productPayListDto;
    }
}
