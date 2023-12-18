package com.grupo3.digitalbook.demo.service;

import com.grupo3.digitalbook.demo.entity.ProductImage;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;

import java.util.List;

public interface IProductImageService {
    ProductImage createProductImage(ProductImage productImage);

    void updateProductImage(ProductImage productImage);

    void deleteProductImage(Long id) throws ResourceNotFoundException;

    ProductImage findProductImageById(Long id) throws ResourceNotFoundException;

    List<ProductImage> getAllProductImages();

}
