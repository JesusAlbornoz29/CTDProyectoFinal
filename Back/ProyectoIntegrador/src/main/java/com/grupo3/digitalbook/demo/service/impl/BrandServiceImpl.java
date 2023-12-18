package com.grupo3.digitalbook.demo.service.impl;

import com.grupo3.digitalbook.demo.entity.Brand;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.repository.IBrandRepository;
import com.grupo3.digitalbook.demo.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;

import java.util.List;
import java.util.Optional;


@Service
public class BrandServiceImpl implements IBrandService {

    private static final Logger logger = Logger.getLogger(BrandServiceImpl.class);

    @Autowired
    private IBrandRepository brandRepository;

    @Override
    public Brand createBrand(Brand brand) {
        logger.info("Se guardará la marca de producto");
        return brandRepository.save(brand); // Guardar la marca en el repositorio y devolverla
    }

    @Override
    public Brand updateBrand(Long id, Brand brand) throws ResourceNotFoundException {
        Optional<Brand> existingBrand = brandRepository.findById(id);

        if (existingBrand.isPresent()) {
            Brand brandToUpdate = existingBrand.get();
            brandToUpdate.setDescription(brand.getDescription());
            return brandRepository.save(brandToUpdate);
        } else {
            throw new ResourceNotFoundException("La marca con ID " + id + " no se encuentra.");
        }
    }

    @Override
    public void deleteBrand(Long id) throws ResourceNotFoundException {
        Optional<Brand> existingBrand = brandRepository.findById(id);

        if (existingBrand.isPresent()) {
            brandRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("La marca con ID " + id + " no se encuentra.");
        }
    }

    @Override
    public Brand findBrandById(Long id) throws ResourceNotFoundException {
        Optional<Brand> brand = brandRepository.findById(id);

        if (brand.isPresent()) {
            return brand.get();
        } else {
            throw new ResourceNotFoundException("La marca con ID " + id + " no se encuentra.");
        }
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findByDescription(String description) {
        return brandRepository.findByDescription(description);
    }
}
