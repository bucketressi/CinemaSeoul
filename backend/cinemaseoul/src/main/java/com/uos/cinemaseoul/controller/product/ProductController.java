package com.uos.cinemaseoul.controller.product;

import com.uos.cinemaseoul.common.paging.ProductCriteria;
import com.uos.cinemaseoul.dto.product.ProductDto;
import com.uos.cinemaseoul.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/prod")
    public ResponseEntity<?> AddProduct(@RequestBody ProductDto dto){
        return ResponseEntity.ok(productService.addProduct(dto));
    }

    @PutMapping("/prod")
    public void UpdateProduct(@RequestBody ProductDto dto){
        productService.updateProduct(dto);
    }

    @PostMapping("/prod/image")
    public void UpdateProductImage(@RequestBody ProductDto dto){
        productService.updateImageProduct(dto);
    }

    @DeleteMapping("/prod/delete/{prod_id}")
    public void DeleteProduct(@PathVariable(name = "prod_id") int prod_id){
        productService.deleteProduct(prod_id);
    }

    @GetMapping("/prod/select/{prod_id}")
    public ResponseEntity<?> selectProduct(@PathVariable(name = "prod_id") int prod_int){
        return ResponseEntity.ok(productService.selectProduct(prod_int));
    }

    @PostMapping("/prod/list")
    public ResponseEntity<?> selectProductList(@RequestBody ProductCriteria productCriteria){
        return ResponseEntity.ok(productService.selectProductList(productCriteria));
    }
}
