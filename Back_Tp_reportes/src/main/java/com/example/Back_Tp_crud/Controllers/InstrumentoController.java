package com.example.Back_Tp_crud.Controllers;

import com.example.Back_Tp_crud.Entity.Instrumento;
import com.example.Back_Tp_crud.Entity.InstrumentoPrintManager;
import com.example.Back_Tp_crud.Service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/instrumento")
@CrossOrigin("*")
public class InstrumentoController {

    @Autowired
    private InstrumentoService instrumentoService;
    @Autowired
    private InstrumentoPrintManager printManager;

    @GetMapping
    ResponseEntity<List<Instrumento>> getAll(){
        return ResponseEntity.ok(instrumentoService.getAll());
    }

    @GetMapping("/{id}")
    ResponseEntity<Instrumento> getById(@PathVariable Long id){
        return ResponseEntity.ok(instrumentoService.getById(id));
    }

    @GetMapping("/categoria/{id}")
    ResponseEntity<List<Instrumento>> getByCategoria(@PathVariable Long id){
        return ResponseEntity.ok(instrumentoService.getByCategoria(id));
    }


    /*@RequestBody: Indica que un parámetro del método debe ser vinculado al cuerpo de la solicitud HTTP.
    Permite deserializar el cuerpo de la solicitud JSON en un objeto Java.*/
    @PostMapping()
    public ResponseEntity<Instrumento> create(@RequestBody Instrumento instrumento){
        return ResponseEntity.ok(instrumentoService.createInstrumento(instrumento));
    }

    /*edit(id): Maneja una solicitud PUT para actualizar una entidad existente.
     * Registra una entrada en el log indicando el inicio del método, la clase de la entidad a editar y el contenido de la entidad.
     * Devuelve la entidad actualizada envuelta en un ResponseEntity con estado HTTP 200 OK. */
    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> edit(@RequestBody Instrumento instrumento, @PathVariable Long id) {
        return ResponseEntity.ok(instrumentoService.updateInstrumento(instrumento,id));
    }

    /*deleteById(id): Maneja una solicitud DELETE para eliminar una entidad por su Id
     * Devuelve una respuesta HTTP con estado 200 OK. */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        instrumentoService.deleteInstrumento(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/generarPDF/{id}")
    public ResponseEntity<byte[]> generatePDF(@PathVariable("id") Long instrumentoId) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            printManager.generarInstrumentoPDF(instrumentoId, outputStream);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));
            headers.setContentDispositionFormData("attachment", "instrumento.pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*






    private Plato getPlatoDataBaseXId(long idPlato) {
        ResultSet rs = null;
        Plato plato = new Plato();

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(this.urlConexion, this.usuario, this.clave);
            Statement s = conexion.createStatement();
            rs = s.executeQuery("SELECT * from plato WHERE id = " + idPlato);

            while(rs.next()) {
                plato.setId(Long.parseLong(rs.getString("id")));
                plato.setNombre(rs.getString("nombre"));
                plato.setImagenPath(rs.getString("imagenPath"));
                plato.setPrecio(rs.getDouble("precio"));
                plato.setRubro(rs.getString("rubro"));
            }

            rs = s.executeQuery("SELECT * FROM plato_ingrediente AS pin INNER JOIN ingrediente i ON pin.idingrediente = i.id WHERE pin.idplato = " + idPlato);

            while(rs.next()) {
                IngredienteCantidad ingCant = new IngredienteCantidad();
                ingCant.setIdIngrediente(Long.parseLong(rs.getString("idingrediente")));
                ingCant.setCantidad(rs.getDouble("cantidad"));
                ingCant.setNombre(rs.getString("nombre"));
                ingCant.setUnidadMedida(rs.getString("unidadMedida"));
                plato.addIngrediente(ingCant);
            }
        } catch (Exception var8) {
            var8.printStackTrace();
        }

        return plato;
    }

    @GetMapping({"api/buscar/{termino}"})
    public List<Plato> getPlatoDataBaseXTermino(@PathVariable String termino) {
        ResultSet rs = null;
        List<Plato> platos = new ArrayList();

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(this.urlConexion, this.usuario, this.clave);
            Statement s = conexion.createStatement();
            rs = s.executeQuery("SELECT * from plato WHERE nombre LIKE '%" + termino + "%'");

            while(rs.next()) {
                Plato plato = new Plato();
                plato.setId(Long.parseLong(rs.getString("id")));
                plato.setNombre(rs.getString("nombre"));
                plato.setImagenPath(rs.getString("imagenPath"));
                plato.setPrecio(rs.getDouble("precio"));
                plato.setRubro(rs.getString("rubro"));
                platos.add(plato);
            }
        } catch (Exception var7) {
            var7.printStackTrace();
        }

        return platos;
    }

    @PostMapping({"api/insert"})
    public Plato insertarPlato(@RequestBody Plato plato) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(this.urlConexion, this.usuario, this.clave);
            PreparedStatement ps = conexion.prepareStatement("INSERT INTO plato(nombre, imagenPath, precio, rubro) VALUES (?, ?, ?, ?)");
            ps.setString(1, plato.getNombre());
            ps.setString(2, plato.getImagenPath());
            ps.setDouble(3, plato.getPrecio());
            ps.setString(4, plato.getRubro());
            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("No se pudo guardar");
            } else {
                ResultSet generatedKeys = ps.getGeneratedKeys();
                long idGenerado = 0L;
                if (generatedKeys.next()) {
                    idGenerado = generatedKeys.getLong(1);
                }

                return this.getPlatoDataBaseXId(idGenerado);
            }
        } catch (Exception var8) {
            var8.printStackTrace();
            return null;
        }
    }

    @PutMapping({"api/update"})
    public Plato actualizarPlato(@RequestBody Plato plato) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(this.urlConexion, this.usuario, this.clave);
            PreparedStatement ps = conexion.prepareStatement("UPDATE plato SET nombre = ?, imagenPath = ?, precio = ?, rubro = ? WHERE id = ?");
            ps.setString(1, plato.getNombre());
            ps.setString(2, plato.getImagenPath());
            ps.setDouble(3, plato.getPrecio());
            ps.setString(4, plato.getRubro());
            ps.setLong(5, plato.getId());
            ps.executeUpdate();
            return this.getPlatoDataBaseXId(plato.getId());
        } catch (Exception var4) {
            var4.printStackTrace();
            return null;
        }
    }

    @DeleteMapping({"api/delete/{id}"})
    public void deletePlato(@PathVariable String id) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(this.urlConexion, this.usuario, this.clave);
            Statement st = conexion.createStatement();
            String sql = "DELETE FROM plato WHERE id = " + id;
            int delete = st.executeUpdate(sql);
            if (delete == 1) {
                System.out.println("plato Borrado");
            } else {
                System.out.println("plato no Borrado");
            }
        } catch (Exception var6) {
            var6.printStackTrace();
        }

    }

    @GetMapping({"api/eliminar/{id}"})
    public String eliminarPlato(@PathVariable String id) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(this.urlConexion, this.usuario, this.clave);
            Statement st = conexion.createStatement();
            String sql = "DELETE FROM plato WHERE id = " + id;
            int delete = st.executeUpdate(sql);
            if (delete == 1) {
                System.out.println("plato Borrado");
                return "OK";
            } else {
                System.out.println("plato no Borrado");
                return "Error";
            }
        } catch (Exception var6) {
            var6.printStackTrace();
            return "";
        }
    }

    @GetMapping({"api/ingredientes"})
    public List<Ingrediente> getIngredientesDataBaseJSON() {
        ResultSet rs = null;
        List<Ingrediente> ingredientes = new ArrayList();

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(this.urlConexion, this.usuario, this.clave);
            Statement s = conexion.createStatement();
            rs = s.executeQuery("select * from ingrediente");

            while(rs.next()) {
                Ingrediente ing = new Ingrediente();
                ing.setId(Long.parseLong(rs.getString("id")));
                ing.setNombre(rs.getString("nombre"));
                ing.setUnidadMedida(rs.getString("unidadMedida"));
                ingredientes.add(ing);
            }
        } catch (Exception var6) {
            var6.printStackTrace();
        }

        return ingredientes;
    }*/
}
