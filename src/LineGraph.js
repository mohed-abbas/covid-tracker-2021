import React, {useState, useEffect} from 'react'
import { Line } from "react-chartjs-2"
import numeral from "numeral"
const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  const buildChartData = (data, casesType='cases') => {
    let chartData = [];
    var lastDataPoint;
    for(let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint= {
                x: date, 
                y: data[casesType][date] - lastDataPoint,
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};


function LineGraph({ casesType }) {
    const [data, setData] = useState({});
    
    
    useEffect(() => {
      let apiIsSubscribed = true;
        const fetchData = async() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          if (apiIsSubscribed) { 
            return response.json()
          }
        })
        .then((data)=> {
          console.log(data);
            let chartData =  buildChartData(data, casesType);
            setData(chartData)
        });

        return () => {
          apiIsSubscribed = false;
        }
    };
        fetchData();
    }, [casesType]);

    
    return (
        <div>
        <h3>i am a</h3>
        {data?.length > 0 && (
            <Line 
            options={options}
            data={{
                datasets:[{
                    backgroundColor : "rgba(204,16,52,0.75)",
                    borderColor: "#cc1034",
                    data:data, 
                },]
            }}/>
        )}
            
        </div>
    )
}

export default LineGraph
