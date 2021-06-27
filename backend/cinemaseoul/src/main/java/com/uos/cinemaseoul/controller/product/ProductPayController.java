package com.uos.cinemaseoul.controller.product;

import com.uos.cinemaseoul.common.paging.PayListCriteria;
import com.uos.cinemaseoul.dto.product.productpay.ProductPayInsertDto;
import com.uos.cinemaseoul.service.product.ProductPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProductPayController {

    private final ProductPayService productPayService;

    @PostMapping("/pay/product")
    public void productPay(@RequestBody ProductPayInsertDto productPayInsertDto){
        productPayService.productPay(productPayInsertDto);
    }

    @DeleteMapping("/product/cancel/{prod_pay_id}")
    public void cancelProductPay(@PathVariable(name = "prod_pay_id") int prod_pay_id){
        productPayService.cancelProductPay(prod_pay_id);
    }

    @PostMapping("/pay/use/product")
    public void useProductCode(@RequestBody Map<String,String> map){
        productPayService.useProductCode(map.get("use_code"));
    }

    @PostMapping("/pay/product/list")
    public ResponseEntity<?> getBookPayList(Authentication authentication, @RequestBody PayListCriteria payListCriteria){
        //매니저 아니면 자기 것만 조회 가능
        if(!authentication.getAuthorities().toString().contains("ROLE_4")){
            payListCriteria.setUser_id(Integer.parseInt(authentication.getName()));
        }

        return ResponseEntity.ok(productPayService.getList(payListCriteria));
    }
}
