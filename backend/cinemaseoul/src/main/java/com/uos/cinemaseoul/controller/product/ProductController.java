package com.uos.cinemaseoul.controller.product;

import com.uos.cinemaseoul.common.paging.ProductCriteria;
import com.uos.cinemaseoul.dto.product.ProductDto;
import com.uos.cinemaseoul.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @RequestMapping(path = "/prod",  method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<?> AddProduct(@RequestPart(name = "product") ProductDto dto,
                                        @RequestPart(name = "image")MultipartFile image) throws IOException {
        if(image != null){
            dto.setImage(image.getBytes());
        }
        return ResponseEntity.ok(productService.addProduct(dto));
    }

    @PutMapping("/prod")
    public void UpdateProduct(@RequestBody ProductDto dto){
        productService.updateProduct(dto);
    }

    @RequestMapping(path = "/prod/image/{prod_id}", method = RequestMethod.PUT, consumes = "multipart/form-data")
    public void UpdateProductImage( @PathVariable(name = "prod_id") int prod_id
            ,@RequestPart(name = "image") MultipartFile image) throws IOException {

        ProductDto dto = new ProductDto();
        dto.setProd_id(prod_id);
        if(image != null){
            dto.setImage(image.getBytes());
        }
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
