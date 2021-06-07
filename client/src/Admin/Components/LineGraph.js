import axios from 'axios';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

class LineGraph extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      
        series: [{
            name: "Questions Solved",
            // data: this.props.data.map(item => item.data)
            data: []
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Questions Solved in a day',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            // categories: this.props.data.map(item => item.key),
            categories: [],
          }
        },
      
      
      };
    }

  async componentDidMount(){
    const response = await axios.get('/api/current_user');
    const key = response.data.timeSeriesGraphData.map(item => item.key);
    const data = response.data.timeSeriesGraphData.map(item => item.data);
    console.log('key', key)
    console.log('data', data)
    this.setState({
      series : [{
        data : data,
      }],
      xaxis : {
        categories : key
      }
    })
  }

    render() {
      return (   
        <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350}/>              
      </div>
      )
    }
}

export default LineGraph;



// import { Area, AreaChart, AreaSeries, Gradient, GradientStop, Line, Stripes } from 'reaviz';


// const MyChart = (props) => {
//   console.log('my props', props)
//   console.log('my data', props.data[0].key)
//   console.log('my data', props.data[0].data)
//   return (
//       <AreaChart
//         width={1000}
//         height={350}
//         data={[
//           { key: new Date(props.data[0].key), data: props.data[0].data },
//         ]}
//         series={
//           <AreaSeries
//             area={
//               <Area
//                 mask={<Stripes />}
//                 gradient={
//                   <Gradient
//                     stops={[
//                       <GradientStop offset="10%" stopOpacity={0} />,
//                       <GradientStop offset="80%" stopOpacity={1} />
//                     ]}
//                   />
//                 }
//               />
//             }
//             line={<Line strokeWidth={3} />}
//           />
//         }
//       />
// )
//   }

// export default MyChart;

