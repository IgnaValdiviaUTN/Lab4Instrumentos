package com.example.Back_Tp_crud.Entity;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import java.util.List;

public class PedidoPrintManager {

    public SXSSFWorkbook imprimirExcelPedidos(List<Pedido> pedidos) {
        SXSSFWorkbook workbook = new SXSSFWorkbook();
        Sheet sheet = workbook.createSheet("Pedidos");

        // Crear el encabezado
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("ID Pedido");
        header.createCell(1).setCellValue("Fecha Pedido");
        header.createCell(2).setCellValue("Total Pedido");
        header.createCell(3).setCellValue("ID Detalle");
        header.createCell(4).setCellValue("Cantidad");
        header.createCell(5).setCellValue("Instrumento");
        header.createCell(6).setCellValue("Marca");
        header.createCell(7).setCellValue("Modelo");
        header.createCell(8).setCellValue("Precio");
        header.createCell(9).setCellValue("Subtotal");

        // Llenar los datos
        int rowNum = 1;
        for (Pedido pedido : pedidos) {
            for (DetallePedido detalle : pedido.getDetalles()) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(pedido.getId());
                row.createCell(1).setCellValue(pedido.getFechaPedido().toString());
                row.createCell(2).setCellValue(pedido.getTotalPedido());
                row.createCell(3).setCellValue(detalle.getId());
                row.createCell(4).setCellValue(detalle.getCantidad());
                row.createCell(5).setCellValue(detalle.getInstrumento().getInstrumento());
                row.createCell(6).setCellValue(detalle.getInstrumento().getMarca());
                row.createCell(7).setCellValue(detalle.getInstrumento().getModelo());
                row.createCell(8).setCellValue(detalle.getInstrumento().getPrecio());
                row.createCell(9).setCellValue(detalle.getCantidad() * detalle.getInstrumento().getPrecio());
            }
        }

        return workbook;
    }
}