import { motion } from 'framer-motion'; 
import CloseIcon from '@mui/icons-material/Close';
import Chart from 'react-apexcharts';
import './Card.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CardTeach = (props) => {
  return (
    <motion.div layout>
      {props.expanded ? 
        <ExpandedCard 
          param={props} 
          setExpanded={props.setExpanded} 
          timeCategories={props.timeCategories} 
        /> :
        <CompactCard param={props} setExpanded={props.setExpanded} /> 
      }
    </motion.div>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  return (
    <motion.div
      className="CompactCard"
      style={{
        border: '1px solid #ccc',
        color: '#000',
        background: 'radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%)'
      }}
      onClick={setExpanded}
      layoutId={`expandableCard-${param.id}`}
    >
      <div className="left-custom">
        <div className="text-start d-flex mt-3 classname">
          <span>{param.className}</span>
        </div>
      </div>
      <div className="detail-right">
        <div className="up">
          <span className="mb-2">Semester: {param.Semester}</span><br />
          <span className="mt-2">Course: {param.Course}</span><br />
        </div>
        <div className="down mb-2">
          <span>OTP: {param.otp}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded, timeCategories }) {
  const data = {
    options: {
      chart: {
        type: "bar",
        height: "auto",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000']
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        },
      },
      colors: ['#1E90FF', '#FF69B4', '#32CD32', '#FFA500'], // Example colors
      tooltip: {
        theme: 'dark',
        x: {
          format: "dd/MM/yyyy HH:mm",
        },
      },
      grid: {
        borderColor: '#f1f1f1',
      },
      xaxis: {
        type: "category",
        categories: timeCategories,
        tickPlacement: 'on',
        labels: {
          style: {
            colors: '#000',
            fontSize: '12px'
          }
        },
        // max: 10,
      },
      yaxis: {
        labels: {
          style: {
            colors: '#000',
            fontSize: '12px'
          }
        },
        max: param.total,
      },
    },
    series: param.series
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: 'radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%)'
      }}
      layoutId={`expandableCard-${param.id}`}
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "black" }}>
        <CloseIcon onClick={setExpanded} />
      </div>
      <div className="chartContainer">
        <Chart options={data.options} series={data.series} type="bar" />
      </div>
    </motion.div>
  );
}

export default CardTeach;
