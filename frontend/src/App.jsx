import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
function App() {
  const [file,setFile]=useState(null)
  const [images,setImages]=useState([])
    function handleChange(e){
      const file=e.target.files[0]
      setFile(file)
   }
   useEffect(()=>{
    getImages()
   },[])
   async function submit(){
    if (!file) {
      alert('Please select a file to upload.')
      return
    }
    const formData=new FormData()
    formData.append('file',file)
    console.log(formData)
    const res=await axios.post('http://localhost:3000/upload',formData)
    console.log(res.data)
   
   }
   async function getImages(){
        let res=await axios.get('http://localhost:3000/uploads')
        console.log(res)
        setImages(res.data.payload)
   }   
  return (
    <div>
      <label>upload Image:</label>
      <input type="file" onChange={handleChange}/>
      <button onClick={submit}>Upload</button>
      <h3>uploaded images</h3>
    {images.length == 0? <p>no images</p>:
      images.map((i,index)=>{
        return  (    <img  key={index} src={`http://localhost:3000/uploads/${i.image}`} alt='uploaded' width='300px' height='200px'/>
       ) })
    }
    </div>
  )
}

export default App