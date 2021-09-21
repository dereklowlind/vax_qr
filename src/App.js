import './App.css';
import { useState } from 'react';

function App() {
  const [imgSrc, setImgSrc] = useState(
      localStorage.getItem('imgSrc') || null
    );

  const handleFileUpload = (e) => {
    // setImg
    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result);
      console.log(reader.result);
      localStorage.setItem('imgSrc', reader.result)
    }
    reader.readAsDataURL(file);
    
    
  }
  return (
    <div className="App">
      {imgSrc && (
              <img
                src={imgSrc} alt="qr code"
                width={'100%'} height={'100%'}
              />
            )}
      <input type='file' onChange={handleFileUpload}/>
    </div>
  );
}

export default App;
