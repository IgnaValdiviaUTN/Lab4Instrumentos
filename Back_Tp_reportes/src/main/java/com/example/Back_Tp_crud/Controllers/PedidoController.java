package com.example.Back_Tp_crud.Controllers;

import com.example.Back_Tp_crud.Entity.Pedido;
import com.example.Back_Tp_crud.Entity.PedidoPrintManager;
import com.example.Back_Tp_crud.Entity.PreferenceMP;
import com.example.Back_Tp_crud.Service.PedidoService;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pedido")
@CrossOrigin("*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private MercadoPagoController mercadoPagoController;

    @PostMapping()
    public ResponseEntity<Long> create(@RequestBody Pedido pedido){
        return ResponseEntity.ok(pedidoService.createPedido(pedido));
    }

    @GetMapping("/mp/{id}")
    ResponseEntity<PreferenceMP> getById(@PathVariable Long id){
        return ResponseEntity.ok(mercadoPagoController.getPreference(id));
    }

    @GetMapping("/chart-mes")
    public ResponseEntity<List<Map<String, Object>>> getPedidosPorMes() {
        List<Map<String, Object>> data = pedidoService.getPedidosPorMes();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/chart-instrumento")
    public ResponseEntity<List<Map<String, Object>>> getPedidosPorInstrumento() {
        List<Map<String, Object>> data = pedidoService.getPedidosPorInstrumento();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/generarExcel")
    public ResponseEntity<Object> generarExcel(@RequestParam("fechaInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaInicio,
                                               @RequestParam("fechaFin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaFin) {
        try {
            // Obtiene la lista de pedidos en el rango de fechas especificado
            List<Pedido> pedidos = pedidoService.getPedidosByFechas(fechaInicio, fechaFin);

            // Si no hay pedidos en el rango de fechas, devuelve un estado 204 No Content con un mensaje
            if (pedidos.isEmpty()) {
                return new ResponseEntity<>("No hay pedidos entre las fechas selecionadas.", HttpStatus.NO_CONTENT);
            }

            // Crea una instancia de PedidoPrintManager para manejar la generación del archivo Excel
            PedidoPrintManager mPrintPedido = new PedidoPrintManager();

            // Genera el archivo Excel con los pedidos
            SXSSFWorkbook libroExcel = mPrintPedido.imprimirExcelPedidos(pedidos);

            // Escribe el contenido del archivo Excel en un ByteArrayOutputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            libroExcel.write(outputStream);

            // Configura los encabezados de la respuesta HTTP
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "pedidos.xlsx");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            // Devuelve el archivo Excel en el cuerpo de la respuesta con estado 200 OK
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (IOException e) {
            // Si ocurre una excepción al generar el archivo Excel, se imprime el stack trace y se devuelve un estado 500 Internal Server Error
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
