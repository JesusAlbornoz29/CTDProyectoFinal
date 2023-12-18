package com.grupo3.digitalbook.demo.controller;

import com.grupo3.digitalbook.demo.entity.ProductImage;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.service.IProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productImage")
public class ProductImageController {

    @Autowired
    private IProductImageService productImageService;

    @PostMapping("/uploadImage")
    public ResponseEntity<ProductImage> createProductImage(@RequestBody ProductImage productImage) {
        ProductImage createdProductImage = productImageService.createProductImage(productImage);
        return new ResponseEntity<>(createdProductImage, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProductImage(@PathVariable Long id, @RequestBody ProductImage productImage) {
        productImageService.updateProductImage(productImage);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductImage(@PathVariable Long id) {
        try {
            productImageService.deleteProductImage(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductImage> findProductImageById(@PathVariable Long id) {
        try {
            ProductImage productImage = productImageService.findProductImageById(id);
            return new ResponseEntity<>(productImage, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<ProductImage>> getAllProductImages() {
        List<ProductImage> productImages = productImageService.getAllProductImages();
        return new ResponseEntity<>(productImages, HttpStatus.OK);
    }
}
