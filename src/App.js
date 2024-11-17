import React, { useEffect, useState } from 'react';
import './InputField.css';
import SignatureCanvas from 'react-signature-canvas'
import  Webcam from 'react-webcam'
import { Bar, Line, Pie } from 'react-chartjs-2';
import {chart as chartjs} from 'chart.js/auto'


const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function App() {

  
  {/* how to access webcam in react fonctionality */}
  const [cap,setCap] = useState('')
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCap(imageSrc)
    },
    [webcamRef]
  );





  const [sign,setSign] = useState()
  const [url,setUrl] = useState()
  const [value,setValue] = useState('')
  const [isOnline,setIsOnline] = useState(navigator.onLine)
  const [progress,setProgress] = useState(0)
  

  const ChartData = {
    labels:["A","B"],
    datasets:[{
      lables:"Demo",
      data:[3000,2000],
      backgroundColor: ["grey","purple"],
      borderColor:['red'],
      borderWidth:10

    }]
  }


  const handleCheck = () =>{

    setIsOnline(navigator.onLine)

  }


  useEffect(() =>{

    window.addEventListener('online',handleCheck)
    window.addEventListener('offline',handleCheck)
    const clear =setInterval (()=>{
      setProgress(val =>{
        const newVal = val + 10
        return newVal > 100 ?100 :newVal
      })

    },1000)
    return () => clearInterval(clear)


  })

  const handleClear = () =>{
    sign.clear()
    setUrl('')

  }
const handleGenerate = () =>{
  setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
    
  }

  return (
    <div className="App">
      <div style = {{border:"2px solid black" ,width: 500, height: 200,}}>
        <SignatureCanvas 
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
        ref = {data => setSign(data)}
        />


       </div>  
       <div style = {{width: 500, height: 200,margin:'10px'}}>
       <button onClick={handleClear}>Clear</button>
       <button onClick={handleGenerate}>Save</button>
       <br />
       <br />


       <img src={url} />
       </div>


       <div>

        <div className='main'>
          <input onChange={(e) => {setValue(e.target.value)}} />
          <span className={value.length == 0 ?"":'fill'} >Email</span>
        </div>

 
       </div>


       {/* how to check internet connection in react js */}

       <div>
        <h1>{isOnline?'Online' :'Offline'}</h1>
       </div>

       <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
       <div style = {{width:'200px',border:'2px solid'}}>
        <div style={{height:'20px',background:'red',width: `${progress}%` ,transition:'width,0.3s ease-in-out'}}>

        </div>
       </div>
       <p>{progress} %</p>
       </div>
       </div>

       {/* how to access webcam in react fonctionality */}
       <div>

       <Webcam
        audio={false}
        height={600}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={600}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>

      <img src={cap} />

       </div>


      {/* Charts in react js */}

        <div>
       <div style={{width:400}}>
        <Bar data={ChartData} />
       </div>
       <div style={{width:400}}>
        <Line data={ChartData} />
       </div>
       <div style={{width:400}}>
        <Pie data={ChartData} />
       </div>
       </div>

    </div>
    

  );
}

export default App;
