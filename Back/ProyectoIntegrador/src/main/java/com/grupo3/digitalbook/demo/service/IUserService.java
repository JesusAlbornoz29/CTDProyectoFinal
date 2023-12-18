package com.grupo3.digitalbook.demo.service;

import com.grupo3.digitalbook.demo.entity.Role;
import com.grupo3.digitalbook.demo.entity.User;

import java.util.List;

public interface IUserService {

    void deleteUserById(Long id);

    List<User> listUsers();

    User findUserByUsername(String username);

    User findUserById(Long id);

    void changeUserRole(Long userId, Role newRole);

}
