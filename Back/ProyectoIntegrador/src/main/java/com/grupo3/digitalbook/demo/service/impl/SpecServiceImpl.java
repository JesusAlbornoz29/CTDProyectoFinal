package com.grupo3.digitalbook.demo.service.impl;

import com.grupo3.digitalbook.demo.entity.Spec;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.repository.ISpecRepository;
import com.grupo3.digitalbook.demo.service.ISpecService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecServiceImpl implements ISpecService {

    private static final Logger logger = Logger.getLogger(SpecServiceImpl.class);

    @Autowired
    private ISpecRepository specRepository;


    @Override
    public Spec createSpec(Spec characteristic) {
        logger.info("Se guardará la característica del producto");
        return specRepository.save(characteristic);
    }

    @Override
    public Spec updateSpec(Long id, Spec characteristic) throws ResourceNotFoundException {
        Optional<Spec> existingCharacteristic = specRepository.findById(id);

        if (existingCharacteristic.isPresent()) {
            Spec characteristicToUpdate = existingCharacteristic.get();
            characteristicToUpdate.setDescription(characteristic.getDescription());

            return specRepository.save(characteristicToUpdate);
        } else {
            throw new ResourceNotFoundException("La característica con ID " + id + "no se encuentra");
        }
    }

    @Override
    public void deleteSpec(Long id) {
        specRepository.deleteById(id);
    }

    @Override
    public Spec findSpecById(Long id) throws ResourceNotFoundException {
        Optional<Spec> specs = specRepository.findById(id);

        if (specs.isPresent()) {
            return specs.get();
        } else {
            throw new ResourceNotFoundException("La característica con ID " + id + "no se encuentra");
        }
    }

    @Override
    public List<Spec> getAllSpecs() {
        return specRepository.findAll();
    }
}
