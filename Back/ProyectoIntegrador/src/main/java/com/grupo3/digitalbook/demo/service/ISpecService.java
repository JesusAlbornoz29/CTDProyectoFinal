package com.grupo3.digitalbook.demo.service;

import com.grupo3.digitalbook.demo.entity.Spec;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;

import java.util.List;

public interface ISpecService {
    Spec createSpec(Spec spec);

    Spec updateSpec(Long id, Spec spec) throws ResourceNotFoundException;

    void deleteSpec(Long id);

    Spec findSpecById(Long id) throws ResourceNotFoundException;

    List<Spec> getAllSpecs();
}
