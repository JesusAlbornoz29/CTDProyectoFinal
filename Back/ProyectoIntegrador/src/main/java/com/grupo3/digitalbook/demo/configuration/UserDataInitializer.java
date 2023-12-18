package com.grupo3.digitalbook.demo.configuration;

import com.grupo3.digitalbook.demo.entity.Role;
import com.grupo3.digitalbook.demo.entity.User;
import com.grupo3.digitalbook.demo.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDataInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Verificar si el usuario "admin" ya existe
        if (!userRepository.findByUsername("admin@admin.com").isPresent()) {
            // Si no existe, crea un usuario de tipo "admin"
            User adminUser = User.builder()
                    .username("admin@admin.com")
                    .password(passwordEncoder.encode("adminpassword")) // Cambia la contraseña
                    .firstname("Admin")
                    .lastname("Admin")
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(adminUser);
        }
    }
}
