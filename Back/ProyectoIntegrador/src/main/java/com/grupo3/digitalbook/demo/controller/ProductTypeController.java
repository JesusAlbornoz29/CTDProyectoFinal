package com.grupo3.digitalbook.demo.controller;

import com.grupo3.digitalbook.demo.entity.ProductType;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.service.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productTypes")
public class ProductTypeController {

    @Autowired
    private IProductTypeService productTypeService;

    @PostMapping("/create")
    public ResponseEntity<ProductType> createProductType(@RequestBody ProductType productType) throws BadRequestException {
        ProductType createdProductType = productTypeService.createProductType(productType);
        return new ResponseEntity<>(createdProductType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductType> updateProductType(@PathVariable Long id, @RequestBody ProductType productType) {
        try {
            ProductType updatedProductType = productTypeService.updateProductType(id, productType);
            return new ResponseEntity<>(updatedProductType, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            e.getMessage();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductType(@PathVariable Long id) {
        productTypeService.deleteProductType(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductType> findProductTypeById(@PathVariable Long id) {
        try {
            ProductType productType = productTypeService.findProductTypeById(id);
            return new ResponseEntity<>(productType, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductType>> getAllProductTypes() {
        List<ProductType> productTypes = productTypeService.getAllProductTypes();
        return new ResponseEntity<>(productTypes, HttpStatus.OK);
    }
}

