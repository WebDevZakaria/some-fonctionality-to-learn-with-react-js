import { useEffect, useState } from 'react';
import './InputField.css';
import SignatureCanvas from 'react-signature-canvas'


function App() {

  const [sign,setSign] = useState()
  const [url,setUrl] = useState()
  const [value,setValue] = useState('')
  const [isOnline,setIsOnline] = useState(navigator.onLine)
  const [progress,setProgress] = useState(0)

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
    </div>
    

  );
}

export default App;
