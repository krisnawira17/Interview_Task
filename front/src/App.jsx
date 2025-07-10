import { useEffect } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [form, setForm] = useState({
    nama: "",
    nomorPolis: "",
    fotoKendaraan: undefined,
    deskripsi: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const [filePreview, setFilePreview] = useState(undefined)

  const handleOnChange =(e) =>{
    e.preventDefault()
    const {name, value} = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectFile = (e) =>{
    if (!e.target.files || e.target.files.length == 0 ){
      setForm(prev => ({
        ...prev,
        fotoKendaraan: undefined,
      }))
      return
    }
    setForm(prev => ({
      ...prev,
      fotoKendaraan: e.target.files[0],
    }))
  }

  useEffect(()=>{
    console.log(form)
  },[form])

  useEffect(()=>{
    if (!form.fotoKendaraan){
      console.log("in")
      setFilePreview(undefined)
      return
    }

    console.log("in2")
    const objUrl = URL.createObjectURL(form.fotoKendaraan)
    setFilePreview(objUrl)

  }, [form])

  const handleSubmit = () =>{
    setSubmitted(true)
  }

  const handleBack = () =>{
    setSubmitted(false)
  }

  return (
    <div className='flex flex-row p-4'>
      {!submitted &&       
      <div className='w-full'>
        <p className='text-center mx-auto text-green-400 mb-4'>Form Pengajuan</p>
        <form className='flex flex-col gap-2 bg-white' onSubmit={handleSubmit}>
          <div className='flex flex-col p-4 bg-white drop-shadow-2xl'>
            <label for="nama" className='mb-2 text-purple-600'>Nama lengkap</label>
            <input name='nama' id="nama" className='w-full border-b focus:outline-none border-black mb-4' onChange={handleOnChange} placeholder='input nama lengkap'></input>

            <label for="polis" className='mb-2 text-purple-600'>Nomor Polis</label>
            <input name='nomorPolis' id="polis" className='w-full border-b focus:outline-none border-black mb-4' onChange={handleOnChange} placeholder='input nomor polis'></input>

            <label for="foto" className='mb-2 text-purple-600'>Upload Foto Kendaraan</label>
            {form.fotoKendaraan && <img className='my-2 w-[10rem] mx-auto' src={filePreview}/>}
            <input name='fotoKendaraan' id="foto" type='file' onChange={handleSelectFile} className='w-full border-b focus:outline-none border-black mb-4'></input>
            
            <label className='text-purple-600' for="deskripsi">Deskripsi Claim</label>
            <input name='deskripsi' id="deskripsi" onChange={handleOnChange} className='w-full border-b focus:outline-none border-black mb-4' placeholder='input deskripsi'></input>
          </div>
          <div className='flex flex-row justify-between gap-2 mt-2'>
            <button className='border border-red-500 rounded-md p-2 w-full cursor-pointer text-red-500'>BACK</button>
            <button className='border border-blue-400 bg-blue-400 rounded-md  p-2 w-full cursor-pointer text-white'>SUBMIT</button>
          </div>   
        </form>
      </div> }
      

    </div>
  )
}

export default App
