package entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class RecetarioChef {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreRecetario;
    private boolean visibleComunidad;

    @ManyToOne
    private UsuarioChef usuarioChef; // Asociación con el usuario que crea el recetario

    @OneToMany(mappedBy = "recetarioChef", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RecetasEnRecetario> recetasEnRecetario; // Asociación con las recetas en el recetario

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreRecetario() {
        return nombreRecetario;
    }

    public void setNombreRecetario(String nombreRecetario) {
        this.nombreRecetario = nombreRecetario;
    }

    public boolean isVisibleComunidad() {
        return visibleComunidad;
    }

    public void setVisibleComunidad(boolean visibleComunidad) {
        this.visibleComunidad = visibleComunidad;
    }

    public UsuarioChef getUsuarioChef() {
        return usuarioChef;
    }

    public void setUsuarioChef(UsuarioChef usuarioChef) {
        this.usuarioChef = usuarioChef;
    }

    public List<RecetasEnRecetario> getRecetasEnRecetario() {
        return recetasEnRecetario;
    }

    public void setRecetasEnRecetario(List<RecetasEnRecetario> recetasEnRecetario) {
        this.recetasEnRecetario = recetasEnRecetario;
    }

    // Constructor

    public RecetarioChef() {
        // Constructor vacío
    }

    // Otros métodos y anotaciones según sea necesario
    
    
}
