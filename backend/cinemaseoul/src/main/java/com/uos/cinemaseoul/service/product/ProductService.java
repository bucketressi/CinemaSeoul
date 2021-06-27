package com.uos.cinemaseoul.service.product;

import com.uos.cinemaseoul.common.mapper.ProductMapper;
import com.uos.cinemaseoul.common.paging.Criteria;
import com.uos.cinemaseoul.common.paging.ProductCriteria;
import com.uos.cinemaseoul.dao.product.ProductDao;
import com.uos.cinemaseoul.dto.product.ProductDto;
import com.uos.cinemaseoul.dto.product.ProductInfoDto;
import com.uos.cinemaseoul.dto.product.ProductListDto;
import com.uos.cinemaseoul.exception.WrongArgException;
import com.uos.cinemaseoul.vo.product.ProductVo;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductDao productDao;
    private final ProductMapper productMapper;

    @Transactional
    public Integer addProduct(ProductDto dto) {
        ProductVo vo = productMapper.insertIntoProdcutVoFromProdcutDto(dto);
        productDao.insertProduct(vo);
        return vo.getProd_id();
    }

    @Transactional
    public void updateProduct(ProductDto dto) {
        ProductVo vo = productMapper.insertIntoProdcutVoFromProdcutDto(dto);
        productDao.updateProduct(vo);
    }

    @Transactional
    public void updateImageProduct(ProductDto dto) {
        ProductVo vo = productMapper.insertIntoProdcutVoFromProdcutDto(dto);
        productDao.updateImageProduct(vo);
    }

    @Transactional
    public void deleteProduct(Integer prod_id) {
        if(productDao.deleteProduct(prod_id) > 1){
            throw new WrongArgException("Too many Deleted");
        }
    }

    @Transactional
    public ProductDto selectProduct(int prod_int) {
        ProductDto pdto = productMapper.insertIntoProdcutDtoFromProdcutVo(productDao.selectProduct(prod_int));

        if(pdto.getImage() != null){
            pdto.setImageBase64(Base64.encodeBase64String(pdto.getImage()));
        }

        return pdto;
    }

    @Transactional
    public ProductListDto selectProductList(ProductCriteria productCriteria) {
        ProductListDto productListDto = new ProductListDto();

        //페이지 계산
        int totalCount = productDao.countList(productCriteria);
        int totalPage =  totalCount / productCriteria.getAmount();
        if(totalCount % productCriteria.getAmount() > 0){
            totalPage++;
        }

        productListDto.setProducts(productDao.selectProductList(productCriteria));

        for(ProductInfoDto pd : productListDto.getProducts()){
            if(pd.getImage() != null){
                pd.setImageBase64(Base64.encodeBase64String(pd.getImage()));
            }
        }

        productListDto.setPageInfo(totalPage, productCriteria.getPage(), productCriteria.getAmount());
        return productListDto;
    }
}
