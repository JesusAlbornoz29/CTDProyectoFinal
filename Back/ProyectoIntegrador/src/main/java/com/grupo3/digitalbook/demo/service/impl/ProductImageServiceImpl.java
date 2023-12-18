package com.grupo3.digitalbook.demo.service.impl;

import com.grupo3.digitalbook.demo.entity.ProductImage;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.repository.IProductImageRepository;
import com.grupo3.digitalbook.demo.service.IProductImageService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ProductImageServiceImpl implements IProductImageService {

    private static final Logger logger = Logger.getLogger(ProductImageServiceImpl.class);

    @Autowired
    private IProductImageRepository iProductImageRepository;

    @Override
    public ProductImage createProductImage(ProductImage productImage) {
        logger.info("Se guardará la imagen");
        return iProductImageRepository.save(productImage);
    }

    @Override
    public void updateProductImage(ProductImage productImage) {
        logger.info("Se va a actualizar la imagen");
        iProductImageRepository.save(productImage); // Actualiza la imagen en lugar de crear una nueva
    }

    @Override
    public void deleteProductImage(Long id) throws ResourceNotFoundException {
        Optional<ProductImage> found = iProductImageRepository.findById(id);
        if (found.isPresent()) {
            iProductImageRepository.deleteById(id);
            logger.warn("Se ha eliminado la imagen con ID: " + id);
        } else {
            throw new ResourceNotFoundException("No se encontró la imagen con el ID: " + id);
        }
    }

    @Override
    public ProductImage findProductImageById(Long id) throws ResourceNotFoundException {
        Optional<ProductImage> optionalProductImage = iProductImageRepository.findById(id);
        return optionalProductImage.orElseThrow(() ->
                new ResourceNotFoundException("No se encontró la imagen con el ID: " + id));
    }

    @Override
    public List<ProductImage> getAllProductImages() {
        logger.info("Se mostrará la lista de imágenes de productos");
        return iProductImageRepository.findAll();
    }
}
