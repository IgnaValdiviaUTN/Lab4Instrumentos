import { Chart } from "react-google-charts";
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import { getBarChart } from "../../servicios/ApiJson";



export const optionsBar = {
  chart: {
    title: "Cantidad de Pedidos",
      subtitle: "Pedidos agrupados por mes y año",
  },
  bars: 'vertical', 
  bar: {groupWidth: "5%"},
    trendlines: {
        0: {
          type: 'linear',
          color: 'green',
          lineWidth: 3,
          opacity: 0.3,
          showR2: true,
          visibleInLegend: true
        }
    }
};

export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  
  export const options = {
    title: "My Daily Activities",
  };

const Charts = () => {
    const [dataBar, setDataBar] = useState([["Month-Year", "Pedidos"]]);

    useEffect(() => {
        getBarChart().then(data => {
            setDataBar(data);
          }).catch(error => {
            console.error("Error fetching bar chart data: ", error);
          });
    }, []);


  return (
    <div style={{width:'100vw', height:'100vh'}}>
        <Menu></Menu>
        <div style={{height:'90%', display:'flex', flexDirection:'row' , justifyContent:'space-around', alignItems:'center'}}>
            <div style={{border:'1px solid grey', borderRadius:'5px', padding:'25px'}}>
            <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={dataBar}
            options={optionsBar}
            />
            </div>
            <div style={{border:'1px solid grey', borderRadius:'5px', padding:'25px'}}>
            <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
            />
            </div>
        </div>
    </div>
  );
}

export default Charts

