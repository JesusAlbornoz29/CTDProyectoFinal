package com.grupo3.digitalbook.demo.service.impl;

import com.grupo3.digitalbook.demo.entity.ProductType;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.repository.IProductTypeRepository;
import com.grupo3.digitalbook.demo.service.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;

import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeServiceImpl implements IProductTypeService {

    private static final Logger logger = Logger.getLogger(ProductTypeServiceImpl.class);

    @Autowired
    private IProductTypeRepository productTypeRepository;

    @Override
    public ProductType createProductType(ProductType productType) throws BadRequestException {
        String description = productType.getDescription();
        if (productTypeRepository.findByDescription(description).isPresent()) {
            throw new BadRequestException("Ya existe un ProductType con el nombre: " + description);
        }
        return productTypeRepository.save(productType);
    }

    @Override
    public ProductType updateProductType(Long id, ProductType productType) throws ResourceNotFoundException, BadRequestException {
        Optional<ProductType> existingProductType = productTypeRepository.findById(id);

        if (existingProductType.isPresent()) {
            ProductType productTypeToUpdate = existingProductType.get();

            String newDescription = productType.getDescription();
            if (newDescription != null && !newDescription.equals(productTypeToUpdate.getDescription())
                    && productTypeRepository.findByDescription(newDescription).isPresent()) {
                throw new BadRequestException("Ya existe un ProductType con el nombre: " + newDescription);
            }

            if (newDescription != null) {
                productTypeToUpdate.setDescription(newDescription);
            }

            String newExtraDescription = productType.getExtraDescription();
            if (newExtraDescription != null) {
                productTypeToUpdate.setExtraDescription(newExtraDescription);
            }

            byte[] newProductTypeImage = productType.getProductTypeImage();
            if (newProductTypeImage != null) {
                productTypeToUpdate.setProductTypeImage(newProductTypeImage);
            }

            return productTypeRepository.save(productTypeToUpdate);
        } else {
            throw new ResourceNotFoundException("El tipo de producto con ID " + id + " no se encuentra.");
        }
    }

    @Override
    public void deleteProductType(Long id) {
        productTypeRepository.deleteById(id);
    }

    @Override
    public ProductType findProductTypeById(Long id) throws ResourceNotFoundException {
        Optional<ProductType> productType = productTypeRepository.findById(id);

        if (productType.isPresent()) {
            return productType.get();
        } else {
            throw new ResourceNotFoundException("El tipo de producto con ID " + id + " no se encuentra.");
        }
    }

    @Override
    public List<ProductType> getAllProductTypes() {
        return productTypeRepository.findAll();
    }
}