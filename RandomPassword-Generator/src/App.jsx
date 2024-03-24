import { useState, useCallback, useEffect, useRef} from "react";
const App = (() => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");

const PasswordRef = useRef(null)
  const generatePassword = useCallback(()=>{

let pass="";
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
if(numberAllowed) str+= "0123456789";
if (characterAllowed) str+= "!@#$%^&*()_+=-{}[]';:,./`~";

for(let i =0; i<length; i++){
  const char = Math.floor(Math.random()*str.length+1);
  pass+=str.charAt(char);
  console.log(pass);
}

setPassword(pass);
//dependencies for optimization
  },[length , numberAllowed , characterAllowed, setPassword])

 const copyPasswordToclipboard = useCallback(() => {
window.navigator.clipboard.writeText(Password);
PasswordRef.current?.select();
 },[Password])

  useEffect(()=>{
    generatePassword();
    //if any changes occur then run this function again
  },[numberAllowed, characterAllowed, length, generatePassword])






  return (
    <>
    <div className="bg-slate-800 w-1/2 mx-auto shadow-2xl  rounded-lg px-2 py-3 my-8  text-white">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-2 py-3 my-8 bg-gray-800  text-blue-400">

        <h1 className="text-4xl text-center my-5 ">Password Generator</h1>

        <div className="flex shadow rounded-lg  overflow-hidden mb-4">

          <input className="bg-slate-100 text-blue-900 mx-1 outline-none w-full rounded-md text-center" type="text" placeholder="Password" value={Password} readOnly ref={PasswordRef} />

          <button className="bg-blue-700 text-white outline-none px-3 py-0.5 shrink-0 rounded-md" onClick={copyPasswordToclipboard} >copy</button>
        </div>
        <div className="flex text-sm gap-x-2 justify-center">
          <div className="flex items-center gap-x-2">
            <input type="range" min={8} max={21} value={length}
              className="cursor-pointer" onChange={(e) => setLength(e.target.value)} />
            <label htmlFor="length">length: {length}</label>
          </div>
          <div>
            <input  className="m-2 " id="number" type="checkbox" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
            <label htmlFor="number">Numbers</label>
            <input type="checkbox" className="m-2 " id="character" defaultChecked={characterAllowed} onChange={() => setCharacterAllowed((prev) => !prev)} />
            <label htmlFor="character">Characters</label>
          </div>
        </div>
      </div>
      </div>
    </>

  )
})

export default App