import { useState } from 'react'
import image from '../assets/download.png'
const QrCodeGenerator=()=>{

    const[img,setImg]=useState(image)
    const[loading,setLoading]=useState(false);
    const[web,setWeb]=useState("youtube");
    const[size,setSize]=useState("150");

    function down(){
       fetch(img).then((response)=>response.blob())
       .then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qr-code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
       });
    }

    async function generate(){
        setLoading(true)
        try{
              const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(web)}`
              setImg(url);
        }
        catch(e){
          alert("Error generating Qr code",e);
        }
        finally{
          setLoading(false)
        }
    }
  return (
    <>
     <div className="qr-container">
     <h1>QR CODE GENERATOR</h1>
     {loading && <p>Please wait</p>}
       <div className="qr">
         {img && <img src={img} className="imageclass"/>}
       </div>
       <div className="qr">
        <label htmlFor="name"  className="label1">Enter your website name</label>
        <input type="text" id="name" placeholder="Enter your website name" onChange={(e)=>setWeb(e.target.value)}></input>
        <label htmlFor="size"  className="label2">Enter image size</label>
        <input type="text" id="size" placeholder="Enter image size" onChange={(e)=>setSize(e.target.value)}></input>
        <button id="button1" className="Buttons" onClick={generate} disabled={loading}>Generate QR Image</button>
        <button id="button2" className="Buttons" onClick={down}>Download QR Image</button>
       </div> 
      
    
     

     </div>
    </>
  )
}

export default QrCodeGenerator

