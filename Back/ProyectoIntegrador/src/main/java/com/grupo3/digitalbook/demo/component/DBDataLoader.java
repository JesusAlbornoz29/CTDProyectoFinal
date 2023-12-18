package com.grupo3.digitalbook.demo.component;

import com.grupo3.digitalbook.demo.entity.Brand;
import com.grupo3.digitalbook.demo.entity.Spec;
import com.grupo3.digitalbook.demo.entity.ProductType;
import com.grupo3.digitalbook.demo.repository.IBrandRepository;
import com.grupo3.digitalbook.demo.repository.ISpecRepository;
import com.grupo3.digitalbook.demo.repository.IProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Component
public class DBDataLoader {

    @Autowired
    private IProductTypeRepository productTypeRepository;
    @Autowired
    private IBrandRepository brandRepository;

    @Autowired
    private ISpecRepository specRepository;

    @PostConstruct
    public void init() {
        if (productTypeRepository.count() == 0) {
            productTypeRepository.saveAll(List.of(
                    new ProductType("Agrícola/Forestal", "Equipos especializados para satisfacer todas tus necesidades en el campo agrícola y forestal.", getImageAsBytes("src/main/resources/images/agro.jpg")),
                    new ProductType("Construcción", "Amplia gama de equipos especializados para satisfacer todas tus necesidades en el sector de la construcción.", getImageAsBytes("src/main/resources/images/construccion.jpg")),
                    new ProductType("Carga útil", "Variedad de equipos diseñados para movilizar materiales y mercancías de manera eficiente en tus proyectos.", getImageAsBytes("src/main/resources/images/carga.jpg")),
                    new ProductType("Infraestructura", "Herramientas esenciales para la construcción y mantenimiento de infraestructuras.", getImageAsBytes("src/main/resources/images/civil.jpg"))
            ));
        }

        if (brandRepository.count() == 0) {
            brandRepository.saveAll(List.of(
                    new Brand("John Deere"),
                    new Brand("Case IH"),
                    new Brand("New Holland"),
                    new Brand("Massey Ferguson"),
                    new Brand("Kubota, Deutz-Fahr"),
                    new Brand("Caterpillar"),
                    new Brand("Komatsu"),
                    new Brand("Volvo"),
                    new Brand("Hitachi"),
                    new Brand("Liebherr"),
                    new Brand("JCB"),
                    new Brand("Bobcat")
            ));
        }

        if (specRepository.count() == 0) {
            specRepository.saveAll(List.of(
                    new Spec("Acceso fácil a los controles", "gamepad"),
                    new Spec("Alcance: 12 metros", "height"),
                    new Spec("Altura de elevación máxima: 9296 mm", "height"),
                    new Spec("Altura de trabajo: 15,72 metros", "height"),
                    new Spec("Cabina espaciosa y cómoda", "airline_seat_recline_extra"),
                    new Spec("Capacidad de carga: 1360 kg", "forklift"),
                    new Spec("Capacidad de carga: 250 kg", "pallet"),
                    new Spec("Capacidad: 0,77 m³ (retroexcavadora)", "pallet"),
                    new Spec("Capacidad: 230 galones", "pallet"),
                    new Spec("Capacidad: Max 7.500 kilogramos", "local_shipping"),
                    new Spec("Carga de elevación: 21,1 toneladas", "weight"),
                    new Spec("Control de flujo digital", "memory"),
                    new Spec("Dirección: Hidráulica", "search_hands_free"),
                    new Spec("Diseño de baja altura", "line_weight"),
                    new Spec("Eficiencia y seguridad", "health_and_safety"),
                    new Spec("Excelente visibilidad", "vrpano"),
                    new Spec("GPS", "location_on"),
                    new Spec("Motor diesel de 100 HP", "swap_driving_apps_wheel"),
                    new Spec("Motor eléctrico: 24-36 V", "lightning_stand"),
                    new Spec("Motor: Diesel", "oil_barrel"),
                    new Spec("Motor: diesel Isuzu de 25 HP", "swap_driving_apps_wheel"),
                    new Spec("Pala cargadora y brazo retroexcavador", "front_loader"),
                    new Spec("Pala: Acopable", "precision_manufacturing"),
                    new Spec("Peso: 8 toneladas", "scale"),
                    new Spec("Plataforma giratoria", "autorenew"),
                    new Spec("Plumín articulado", "precision_manufacturing"),
                    new Spec("Potencia: 180 HP", "swap_driving_apps_wheel"),
                    new Spec("Potencia: 340 HP", "swap_driving_apps_wheel"),
                    new Spec("Potencia: 45 HP", "swap_driving_apps_wheel"),
                    new Spec("Potencia: 50 HP", "swap_driving_apps_wheel"),
                    new Spec("Refrigeración: Thermo King", "ac_unit"),
                    new Spec("Robustez: Diseño para entornos difíciles", "security"),
                    new Spec("Rociador de sellador: doble cabezal", "keyboard_double_arrow_down"),
                    new Spec("Seguridad: avanzada", "shield_locked"),
                    new Spec("Sistema de ahorro de combustible", "energy_savings_leaf"),
                    new Spec("Sistema de apagado automático", "power_settings_new"),
                    new Spec("Sistema de audio", "music_cast"),
                    new Spec("Sistema de control hidráulico: Sí", "humidity_low"),
                    new Spec("Sistema de protección contra vuelcos", "lock_reset"),
                    new Spec("Sistema de seguridad integrado: Sí", "shield_locked"),
                    new Spec("Suspensión de 3 puntos", "agriculture"),
                    new Spec("Tanque: Acero inoxidable de doble pared", "door_sliding"),
                    new Spec("TDP: 540 rpm", "attractions"),
                    new Spec("Tracción: 4x4", "search_hands_free"),
                    new Spec("Transmisión: Full Powershift de 18+4 marchas", "auto_transmission"),
                    new Spec("Transmisión: Manual, 8+2 velocidades", "auto_transmission")
            ));
        }
    }


    private byte[] getImageAsBytes(String imagePath) {
        try {
            Path path = Paths.get(imagePath);
            return Files.readAllBytes(path);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

