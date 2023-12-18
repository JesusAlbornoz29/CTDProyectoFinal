package com.grupo3.digitalbook.demo.service;

import com.grupo3.digitalbook.demo.entity.Brand;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;

import java.util.List;

public interface IBrandService {
    Brand createBrand(Brand brand);

    Brand updateBrand(Long id, Brand brand) throws ResourceNotFoundException;

    void deleteBrand(Long id) throws ResourceNotFoundException;

    Brand findBrandById(Long id) throws ResourceNotFoundException;

    List<Brand> getAllBrands();

    Brand findByDescription(String description);
}

