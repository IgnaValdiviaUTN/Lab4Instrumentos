import { Chart } from "react-google-charts";
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";


const Charts = () => {
  
  const [pedidosPorMes, setPedidosPorMes] = useState([]);
  const [pedidosPorInstrumento, setPedidosPorInstrumento] = useState([]);
  useEffect(()=>{
    const fetchPedidosPorMes = async () => {
      const response = await axios.get('http://localhost:8080/pedido/chart-mes');
      setPedidosPorMes(response.data);
    };

    const fetchPedidosPorInstrumento = async () => {
      const response = await axios.get('http://localhost:8080/pedido/chart-instrumento');
      setPedidosPorInstrumento(response.data);
    };

    fetchPedidosPorMes();
    fetchPedidosPorInstrumento();
  },[]);
  const dataPorMes = [['Mes', 'Cantidad'], ...pedidosPorMes.map(item => [item.mes, item.cantidad])];
  const dataPorInstrumento = [['Artículo', 'Cantidad'], ...pedidosPorInstrumento.map(item => [item.instrumento, item.cantidad])];

  const generarExcel = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pedido/generarExcel', {
        responseType: 'blob',
        params: {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        }
      });

      if (response.status === 204) {
        alert('No hay pedidos entre las fechas seleccionadas.');
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (error) {
      console.error('Error al generar Excel:', error);
    }
  };

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Menu></Menu>
      <div
        style={{
          height: "65%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            padding: "0 30px 0 0",
            width: "45%",
          }}
        >
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="ColumnChart"
            loader={<div>Cargando Gráfico</div>}
            data={dataPorMes}
            options={{
              title: 'Pedidos por Mes',
              legend: { position: 'none' },
              vAxis: { title: 'Cantidad' },
              hAxis: { title: 'Mes' },
            }}
          />
        </div>
        <div
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            padding: "25px",
          }}
        >
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="PieChart"
            loader={<div>Cargando Gráfico</div>}
            data={dataPorInstrumento}
            options={{ title: 'Pedidos por Instrumento' }}
          />
        </div>
        
      </div>
      <div style={{padding:'25px', width:'50%'}}>
        <h3>Reporte Excel</h3>
        <div style={{display:'flex',flexDirection:'row',padding:'5px'}}>
          <input style={{width:'500px',margin:'0 15px 5px 0'}} className="form-control" type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
          <input  style={{width:'500px',margin:'0 0 5px 0'}} className="form-control" type="date" value={fechaFin} onChange={handleFechaFinChange} />
        </div>
        <Button variant="success" onClick={generarExcel}>Generar Excel</Button>
      </div>
      
    </div>
  );
};

export default Charts;
