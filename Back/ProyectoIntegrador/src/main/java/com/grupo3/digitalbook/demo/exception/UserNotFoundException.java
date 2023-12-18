package com.grupo3.digitalbook.demo.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class UserNotFoundException extends ResponseEntityExceptionHandler {

    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<Object> handleNotFoundException(RuntimeException ex, WebRequest request) {
        if (ex.getMessage().equals("Usuario no encontrado")) {
            // Si la excepción es "Usuario no encontrado", responde con un estado 404
            return handleExceptionInternal(ex, null, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
        } else {
            // Otras excepciones pueden ser manejadas de manera predeterminada con un estado 500
            return handleExceptionInternal(ex, null, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
        }
    }
}