package com.grupo3.digitalbook.demo.controller;

import com.grupo3.digitalbook.demo.entity.Brand;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
public class BrandController {

    @Autowired
    private IBrandService brandService;

    @PostMapping("/create")
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        Brand createdBrand = brandService.createBrand(brand);
        return new ResponseEntity<>(createdBrand, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody Brand brand) {
        try {
            Brand updatedBrand = brandService.updateBrand(id, brand);
            return new ResponseEntity<>(updatedBrand, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        try {
            brandService.deleteBrand(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> findBrandById(@PathVariable Long id) {
        try {
            Brand brand = brandService.findBrandById(id);
            return new ResponseEntity<>(brand, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }
}
