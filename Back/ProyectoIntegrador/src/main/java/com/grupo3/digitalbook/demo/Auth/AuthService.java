package com.grupo3.digitalbook.demo.Auth;

import com.grupo3.digitalbook.demo.Jwt.JwtService;
import com.grupo3.digitalbook.demo.entity.Dto.UserDto;
import com.grupo3.digitalbook.demo.entity.Role;
import com.grupo3.digitalbook.demo.entity.User;
import com.grupo3.digitalbook.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);

        // Construye un UserDto a partir de los detalles del usuario
        UserDto userDto = buildUserDto(user);

        // Crea y devuelve la respuesta AuthResponse con el token y el UserDto
        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setUserDto(userDto);

        return authResponse;
    }


    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .role(Role.USER)
                .build();

        userRepository.save(user);

        String token = jwtService.getToken(user);
        AuthResponse authResponse = buildAuthResponse(token, user);


        return authResponse;
    }

    private AuthResponse buildAuthResponse(String token, UserDetails userDetails) {
        UserDto userDto = buildUserDto(userDetails);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setUserDto(userDto);

        return authResponse;
    }


    private UserDto buildUserDto(UserDetails userDetails) {
        if (userDetails instanceof User) {
            User user = (User) userDetails;
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setUsername(user.getUsername());
            userDto.setFirstName(user.getFirstname());
            userDto.setLastName(user.getLastname());
            userDto.setRole(user.getRole());
            return userDto;
        }
        return null;
    }

}
