package com.grupo3.digitalbook.demo.exception;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = Logger.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({ResourceNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> procesarNotFoundException(ResourceNotFoundException exception) {
        Map<String, String> exceptionMessage = new HashMap<>();  // Se crea un map para almacenar el mensaje de error.
        exceptionMessage.put("message", "Recurso no encontrado: " + exception.getMessage());
        logger.warn(exceptionMessage.put("message", "Recurso no encontrado: " + exception.getMessage()));
        return exceptionMessage;
    }
}

