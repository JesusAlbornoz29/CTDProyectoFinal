package com.grupo3.digitalbook.demo.service.impl;

import com.grupo3.digitalbook.demo.entity.Brand;
import com.grupo3.digitalbook.demo.entity.Product;
import com.grupo3.digitalbook.demo.entity.ProductImage;
import com.grupo3.digitalbook.demo.entity.Spec;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.repository.IBrandRepository;
import com.grupo3.digitalbook.demo.repository.IProductImageRepository;
import com.grupo3.digitalbook.demo.repository.IProductRepository;
import com.grupo3.digitalbook.demo.service.IProductService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ProductServiceImpl implements IProductService {
    private final static Logger LOGGER = Logger.getLogger(ProductServiceImpl.class);

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IProductImageRepository productImageRepository;

    @Autowired
    private IBrandRepository brandRepository;


    @Override
    public Product createProduct(Product product) throws BadRequestException {
        String productName = product.getName();

        if (productRepository.existsByName(productName)) {
            throw new BadRequestException("Ya existe un producto con el mismo nombre: " + productName);
        }

        return productRepository.save(product);
    }


    @Override
    public Product updateProduct(Long id, Product productNew) throws BadRequestException, ResourceNotFoundException {
        Optional<Product> existingProduct = productRepository.findById(id);

        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();

            if (productNew.getName() != null) {
                product.setName(productNew.getName());
            }
            if (productNew.getDescription() != null) {
                product.setDescription(productNew.getDescription());
            }
            if (productNew.getPrice() != null) {
                product.setPrice(productNew.getPrice());
            }
            if (productNew.getStock() != null) {
                product.setStock(productNew.getStock());
            }

            // Actualizar la marca solo si se proporciona en productNew
            if (productNew.getBrand() != null) {
                Brand newBrand = productNew.getBrand();

                // Verificar si la nueva marca ya existe en la base de datos
                Optional<Brand> existingBrand = Optional.ofNullable(brandRepository.findByDescription(newBrand.getDescription()));

                if (existingBrand.isPresent()) {
                    // La marca ya existe, simplemente asignarla al producto
                    product.setBrand(existingBrand.get());
                } else {
                    // La marca no existe, guardarla primero y luego asignarla al producto
                    brandRepository.save(newBrand);
                    product.setBrand(newBrand);
                }
            }

            if (productNew.getProductType() != null) {
                product.setProductType(productNew.getProductType());
            }

            if (productNew.getSpecs() != null && !productNew.getSpecs().isEmpty()) {
                product.getSpecs().clear();
                for (Spec spec : productNew.getSpecs()) {
                    product.getSpecs().add(spec);
                }
            }

            if (productNew.getProductImages() != null && !productNew.getProductImages().isEmpty()) {
                productImageRepository.deleteAll(product.getProductImages());

                product.getProductImages().clear();

                for (ProductImage productImage : productNew.getProductImages()) {
                    productImage.setProduct(product);
                    product.getProductImages().add(productImage);
                }
            }

            LOGGER.info("Se actualizó el producto");
            return productRepository.save(product);
        } else {
            LOGGER.error("No existe este producto");
            throw new ResourceNotFoundException("No existe este producto");
        }
    }


    @Override
    public void deleteProduct(Long id) throws ResourceNotFoundException {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            LOGGER.info("Producto eliminado correctamente");
        } else {
            LOGGER.error("No se pudo eliminar el producto");
            throw new ResourceNotFoundException("No se eliminó el producto");
        }
    }

    @Override
    public Optional<Product> findProductById(Long id) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            LOGGER.info("se encontro el producto");
            return product;
        } else {
            LOGGER.error("no existe este producto");
            throw new ResourceNotFoundException("no existe este producto");
        }
    }


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    @Override
    public List<Product> getFirst20Products(Pageable pageable) {
        return productRepository.findTop20ByOrderByIdAsc(pageable);
    }

    @Override
    public List<Product> getFirst10Products(Pageable pageable) {
        return productRepository.findTop10ByOrderByIdAsc(pageable);
    }

    @Override
    public List<Product> getProductsBySpec(Spec spec) {
        return spec.getProducts();
    }
}


