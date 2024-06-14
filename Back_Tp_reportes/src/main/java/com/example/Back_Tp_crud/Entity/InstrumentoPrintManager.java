package com.example.Back_Tp_crud.Entity;

import com.example.Back_Tp_crud.Service.InstrumentoService;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.UnitValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

/*@Component: Esta anotación marca esta clase como un componente de Spring,
lo que significa que será administrada por el contenedor de Spring
y se puede inyectar en otras partes de la aplicación.*/
@Component
public class InstrumentoPrintManager {

    // Constructor que inyecta el servicio de instrumentos
    @Autowired
    private InstrumentoService instrumentoService;


    public void generarInstrumentoPDF(Long instrumentoId, ByteArrayOutputStream outputStream) throws IOException {

        // Estas clases de iTextPDF son utilizadas para escribir y manejar documentos PDF respectivamente.
        try (PdfWriter writer = new PdfWriter(outputStream);

             PdfDocument pdf = new PdfDocument(writer)) {
            //Crear un nuevo documento pdf tamaño  A4
            Document document = new Document(pdf, PageSize.A4);

            //Encabezado
            Image imgCabeceraLeft = new Image(ImageDataFactory.create("https://th.bing.com/th/id/OIP.8f9gkPAUgmVQOx0W6xS5uAHaE8?rs=1&pid=ImgDetMain"));
            Image imgCabeceraRight = new Image(ImageDataFactory.create("https://png.pngtree.com/png-clipart/20200709/original/pngtree-modern-guitar-music-logo-png-image_3570998.jpg"));

            //Escalar las imágenes
            imgCabeceraLeft.scaleAbsolute(90f, 90f);
            imgCabeceraRight.scaleAbsolute(90f, 90f);

            //Alinear las imágenes y agregarlas al documento en posiciones fijas
            imgCabeceraLeft.setFixedPosition(50, 750);
            document.add(imgCabeceraLeft);

            imgCabeceraRight.setFixedPosition(500, 750);
            document.add(imgCabeceraRight);

            //Se agregan párrafos en blanco para crear espacio entre las imágenes y el contenido siguiente del PDF.
            for (int i = 0; i < 4; i++) {
                document.add(new Paragraph("\n"));
            }

            //Se añade una línea divisoria y más espacio en blanco antes de añadir la información del instrumento.
            document.add(new LineSeparator(new SolidLine()));
            for (int i = 0; i < 2; i++) {
                document.add(new Paragraph("\n"));
            }

            Instrumento instrumento = instrumentoService.getById(instrumentoId);

            // Llama al método para agregar la información del instrumento al documento PDF
            addInstrumentoDocumento(document, instrumento);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /*Este método toma el documento PDF y un objeto Instrumento, y agrega toda la información del instrumento al documento.*/
    private void addInstrumentoDocumento(Document document, Instrumento instrumento) {
        //Se crea una tabla con tres columnas de diferentes anchos porcentuales
        float[] columnWidths = {50, 25, 25};
        Table table = new Table(UnitValue.createPercentArray(columnWidths)).useAllAvailableWidth();

        try {
            //Cargar la imagen
            Image imgInstrumento = new Image(ImageDataFactory.create(instrumento.getImagen()));

            imgInstrumento.setAutoScale(true);

            //Se crea una celda en la tabla para mostrar la imagen del instrumento, la cual ocupa seis filas
            Cell imgCell = new Cell(6, 1).add(imgInstrumento).setBorder(Border.NO_BORDER);
            table.addCell(imgCell);

            //Añadir filas
            addInfoRowToTable(table, "Instrumento:", instrumento.getInstrumento());
            addInfoRowToTable(table, "Marca:", instrumento.getMarca());
            addInfoRowToTable(table, "Modelo:", instrumento.getModelo());
            addInfoRowToTable(table, "Costo de envío:", instrumento.getCostoEnvio());
            addInfoRowToTable(table, "Precio:", String.valueOf(instrumento.getPrecio()));

        } catch (Exception e) {
            e.printStackTrace();
        }

        //Añadir la tabla
        document.add(table);

        //Se añade una tabla adicional para mostrar la descripción del instrumento en una celda que ocupa toda la tabla.
        try {
            Table descriptionTable = new Table(1).useAllAvailableWidth();
            Cell descriptionCell = new Cell().add(new Paragraph("Descripción: " + instrumento.getDescripcion())).setBorder(Border.NO_BORDER);
            descriptionTable.addCell(descriptionCell);
            document.add(descriptionTable);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /*Este método privado simplifica la adición de filas de información a la tabla del documento PDF,
    creando celdas para los atributos y valores del instrumento.*/
    private void addInfoRowToTable(Table table, String attribute, String value) {
        Cell attributeCell = new Cell().add(new Paragraph(attribute)).setBorder(Border.NO_BORDER);
        Cell valueCell = new Cell().add(new Paragraph(value)).setBorder(Border.NO_BORDER);

        table.addCell(attributeCell);
        table.addCell(valueCell);
    }



}
