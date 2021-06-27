package com.uos.cinemaseoul.dao.product;

import com.uos.cinemaseoul.common.paging.ProductCriteria;
import com.uos.cinemaseoul.dto.product.ProductDto;
import com.uos.cinemaseoul.dto.product.ProductInfoDto;
import com.uos.cinemaseoul.vo.product.ProductVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductDao {
    int insertProduct(ProductVo vo);

    void updateProduct(ProductVo vo);

    void updateImageProduct(ProductVo vo);

    int deleteProduct(Integer prod_id);

    ProductVo selectProduct(int prod_int);

    int countList(ProductCriteria productCriteria);
    List<ProductInfoDto> selectProductList(ProductCriteria productCriteria);
}
