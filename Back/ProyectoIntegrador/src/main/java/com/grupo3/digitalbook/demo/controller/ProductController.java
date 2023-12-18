package com.grupo3.digitalbook.demo.controller;

import com.grupo3.digitalbook.demo.entity.Brand;
import com.grupo3.digitalbook.demo.entity.Product;
import com.grupo3.digitalbook.demo.entity.ProductImage;
import com.grupo3.digitalbook.demo.entity.Spec;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.service.IProductService;
import com.grupo3.digitalbook.demo.service.ISpecService;
import com.grupo3.digitalbook.demo.service.impl.BrandServiceImpl;
import com.grupo3.digitalbook.demo.service.impl.ProductImageServiceImpl;
import com.grupo3.digitalbook.demo.service.impl.ProductServiceImpl;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductServiceImpl productServiceImpl;

    @Autowired
    private BrandServiceImpl brandService;
    @Autowired
    private ProductImageServiceImpl productImageServiceImpl;

    @Autowired
    private ISpecService specService;

    @Autowired
    private IProductService productService;

    private final static Logger LOGGER = Logger.getLogger(ProductController.class);


    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(
            @RequestBody @Valid Product product) throws BadRequestException {

        String brandDescription = product.getBrand().getDescription();
        Brand existingBrand = brandService.findByDescription(brandDescription);

        if (existingBrand == null) {
            // Si la marca no existe, crea una nueva marca
            Brand newBrand = new Brand(brandDescription);
            existingBrand = brandService.createBrand(newBrand);
        }

        // Asocia la marca existente al producto
        product.setBrand(existingBrand);

        Set<ProductImage> productImages = product.getProductImages();

        product.setProductImages(null);
        Product createdProduct = productServiceImpl.createProduct(product);

        if (productImages != null && !productImages.isEmpty()) {
            for (ProductImage productImage : productImages) {
                productImage.setProduct(createdProduct);
                productImageServiceImpl.createProductImage(productImage);
            }
        }

        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productNew) {
        try {
            Product updatedProduct = productServiceImpl.updateProduct(id, productNew);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        try {
            Optional<Product> product = productServiceImpl.findProductById(id);
            return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productServiceImpl.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productServiceImpl.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/first20")
    public ResponseEntity<List<Product>> getFirst20Products() {
        Pageable pageable = PageRequest.of(0, 20);
        List<Product> products = productServiceImpl.getFirst20Products(pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/first10")
    public ResponseEntity<List<Product>> getFirst10Products() {
        Pageable pageable = PageRequest.of(0, 10);
        List<Product> products = productServiceImpl.getFirst10Products(pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/productsBySpec/{id}")
    public ResponseEntity<List<Product>> getProductsBySpecId(@PathVariable Long id) {
        try {
            Spec spec = specService.findSpecById(id);
            List<Product> products = productService.getProductsBySpec(spec);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}


