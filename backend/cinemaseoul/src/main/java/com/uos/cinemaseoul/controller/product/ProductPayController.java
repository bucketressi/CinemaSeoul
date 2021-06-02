package com.uos.cinemaseoul.controller.product;

import com.uos.cinemaseoul.dto.product.productpay.ProductPayInsertDto;
import com.uos.cinemaseoul.service.product.ProductPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
