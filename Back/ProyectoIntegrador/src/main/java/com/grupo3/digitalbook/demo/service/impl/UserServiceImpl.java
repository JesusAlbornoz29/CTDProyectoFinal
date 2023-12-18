package com.grupo3.digitalbook.demo.service.impl;

import com.grupo3.digitalbook.demo.entity.Role;
import com.grupo3.digitalbook.demo.entity.User;
import com.grupo3.digitalbook.demo.repository.UserRepository;
import com.grupo3.digitalbook.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public User findUserByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        throw new RuntimeException("Usuario no encontrado");
    }

    public User findUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        throw new RuntimeException("Usuario no encontrado");
    }

    @Override
    public void changeUserRole(Long userId, Role newRole) {
        User user = findUserById(userId);
        user.setRole(newRole);
        userRepository.save(user);
    }
}

