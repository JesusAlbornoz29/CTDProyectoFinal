package com.grupo3.digitalbook.demo.controller;

import com.grupo3.digitalbook.demo.entity.Spec;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.service.ISpecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/specs")
public class SpecController {
    @Autowired
    private ISpecService specService;

    @PostMapping("/create")
    public ResponseEntity<Spec> createsPec(@RequestBody Spec spec) {
        Spec createdSpec = specService.createSpec(spec);
        return new ResponseEntity<>(createdSpec, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Spec> updateSpec(@PathVariable Long id, @RequestBody Spec spec) {
        try {
            Spec updateSpec = specService.updateSpec(id, spec);
            return new ResponseEntity<>(updateSpec, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            e.getMessage();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpec(@PathVariable Long id) {
        specService.deleteSpec(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Spec> findSpecById(@PathVariable Long id) {
        try {
            Spec spec = specService.findSpecById(id);
            return new ResponseEntity<>(spec, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping
    public ResponseEntity<List<Spec>> getAllSpecs() {
        List<Spec> specs = specService.getAllSpecs();
        return new ResponseEntity<>(specs, HttpStatus.OK);
    }

}


