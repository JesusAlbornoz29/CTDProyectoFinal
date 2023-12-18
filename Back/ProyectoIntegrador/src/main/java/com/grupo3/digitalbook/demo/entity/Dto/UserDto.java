package com.grupo3.digitalbook.demo.entity.Dto;

import com.grupo3.digitalbook.demo.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private Role role;
}
