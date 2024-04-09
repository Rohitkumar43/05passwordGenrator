import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {


  const [length , setlength] = useState(8);
  const [numberAllowed , setnumberAllowed] = useState(false);
  const [character , setcharacter] = useState(false);

  const [Password , setPassword] = useState("");
  // use of hook that is useRef hook

  const passwordRef = useRef(null);



  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str = str + "0123456789";
    }
    if(setcharacter){
      str  = str + "~!@#$%^&*()_+?{}"
    }

    for(let i = 1; i <=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  } , [length , numberAllowed , character , setPassword])
// we write  method over here where for the copy of the password to the clickboard 
  const copyMethodtoClipboard = useCallback(() => {
    /* things we can do by the use of useRef hook thAT we can select particular area or giving a 
     galce which we do on the screen 
     example */
    passwordRef.current?.select();
    // select for the given range
    passwordRef.current?.setSelectionRange(0,4);
    // ye kaam toh useRef ke bina bina bhi ho sakta hai
    window.navigator.clipboard.writeText(Password)// this line of code will help to copy the text to clickboard
  } , [Password]);


  useEffect (() => {
    passwordGenrator();
  } ,[length , numberAllowed , character , setPassword]);

  return (
    <>
      <h1 className="text-6xl text-centre text-white">Password Genrator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-5 my-9
      bg-gray-800 text-orange-500'>
        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input type="text" value={Password} className='outline-none w-full py-1 px-3'
          ref={passwordRef} placeholder='Password' readOnly  />
          <button onClick={copyMethodtoClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-1'></div>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)}} />
          <label >Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed}
          id = "numberInput" 
          onChange={() => {
            setnumberAllowed((prev) => !prev);
          }}/>
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked = {character}
          id ="characterInput"
          onChange={() => {
            setcharacter((prev) => !prev);
          }} />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
