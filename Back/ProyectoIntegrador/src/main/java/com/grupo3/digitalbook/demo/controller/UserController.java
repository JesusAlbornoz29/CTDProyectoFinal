package com.grupo3.digitalbook.demo.controller;

import com.grupo3.digitalbook.demo.entity.Dto.UserDto;
import com.grupo3.digitalbook.demo.entity.Role;
import com.grupo3.digitalbook.demo.entity.User;
import com.grupo3.digitalbook.demo.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok("Usuario eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    @GetMapping()
    public ResponseEntity<List<UserDto>> listUsers() {
        List<User> users = userService.listUsers();
        List<UserDto> userDtos = users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> findUserByUsername(@PathVariable String username) {
        User user = userService.findUserByUsername(username);
        if (user != null) {
            UserDto userDto = convertToDto(user);
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        if (user != null) {
            UserDto userDto = convertToDto(user);
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<String> changeUserRole(@PathVariable Long id, @RequestParam Role newRole) {
        try {
            userService.changeUserRole(id, newRole);
            return ResponseEntity.ok("Rol de usuario cambiado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    // Método para convertir User a UserDto
    private UserDto convertToDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstname());
        userDto.setLastName(user.getLastname());
        userDto.setRole(user.getRole());
        return userDto;
    }
}
