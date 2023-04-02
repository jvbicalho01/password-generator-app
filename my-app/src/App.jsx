import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [password, setPassword] = useState("")

  const [characterLenght, setCharacterLenght] = useState(4)
  const handleCharacterLenght = (e) => setCharacterLenght(e.target.value);

  const [uppercase, setUppercase] = useState(false)
  const handleUppercase = () => setUppercase(!uppercase)

  const [lowercase, setLowercase] = useState(false)
  const handleLowercase = () => setLowercase(!lowercase)

  const [numbers, setNumbers] = useState(false)
  const handleNumbers = () => setNumbers(!numbers)

  const [symbols, setSymbols] = useState(false)
  const handleSymbols = () => setSymbols(!symbols)

  const [strength, setStrength] = useState("Normal")

  const generatePassword = () => {
    const lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lettersLower = "abcdefghijklmnopqrstuvwxyz"
    const charNumbers = "0123456789"
    const charSymbols = "!@#$%&*()-_<>{}?/\|:;"

    let validChars = ""

    if (uppercase) validChars += lettersUpper
    if (lowercase) validChars += lettersLower
    if (numbers) validChars += charNumbers
    if (symbols) validChars += charSymbols

    let newPassword = ""
    let counter = 0;
    for (let i = 0; i < characterLenght; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      newPassword += validChars[index];
    }

    setPassword(newPassword)
    verifyStreght()

  }

  const verifyStreght = () => {
    if (characterLenght <= 8) {
      setStrength("Weak")
    }
    if (characterLenght > 8 && characterLenght < 15 && uppercase && lowercase && numbers) {
      setStrength("Normal")
    }
    if (characterLenght >= 16 && uppercase && lowercase && numbers && symbols) {
      setStrength("Strong")
    }
  }

  return (
    <div className="main-container">
      <h1>Password Generator</h1>
      <div className="password-generated">
        {password}
      </div>

      <div className="password-options">
        <div className="character-length">
          <h2>Character Length</h2>
          <p>{characterLenght}</p>
        </div>
        <input type="range" className="character-lenght-input"
          min="4" max="20" step="1" value={characterLenght} onChange={handleCharacterLenght} />
        <div className="checkbox-options">
          <input type="checkbox" className="uppercase" onChange={handleUppercase} checked={uppercase} />
          <p className='uppercase-label'>Include Uppercase Leters</p>
        </div>
        <div className="checkbox-options">
          <input type="checkbox" className="lowercase" onChange={handleLowercase} checked={lowercase} />
          <p className='lowercase-label'>Include Lowercase Leters</p>
        </div>
        <div className="checkbox-options">
          <input type="checkbox" className="numbers" onChange={handleNumbers} checked={numbers} />
          <p className='numbers-label'>Include Numbers</p>
        </div>
        <div className="checkbox-options">
          <input type="checkbox" className="symbols" onChange={handleSymbols} checked={symbols} />
          <p className='symbols-label'>Include Symbols</p>
        </div>

        {!(uppercase || lowercase || numbers || symbols || characterLenght > 4) && <p className='validation'>Please, select at least one option</p>}

        <div className='password-strenght'>
          <p>STRENGHT</p>
          <p className='strenght'>{strength}</p>
        </div>

        {
          (uppercase || lowercase || numbers || symbols) ?
            <button className="generate-password" onClick={generatePassword}>GENERATE</button> :
            <button className="generate-password" onClick={generatePassword} disabled>GENERATE</button>
        }
      </div>

    </div>
  )
}

export default App
