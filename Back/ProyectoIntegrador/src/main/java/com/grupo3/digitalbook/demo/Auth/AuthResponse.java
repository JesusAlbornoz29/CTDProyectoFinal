package com.grupo3.digitalbook.demo.Auth;

import com.grupo3.digitalbook.demo.entity.Dto.UserDto;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthResponse {
    private String token;
    private UserDto userDto;
}
