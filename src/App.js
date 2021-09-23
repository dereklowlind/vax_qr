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
      
      <h1>Instructions</h1>
      <div>
        <div>1. Open the App (preferably in safari if IOS and chrome if Android)</div>
        <div>2. Click the share button, and select add to Home Screen.</div>
        <img src='1-pin-website-to-iPhone.webp' alt='iOS how to pin website to homescreen' 
           height={100} style={{paddingRight: '20px'}}
        />
        <img src='android-chrome-menu-add-to-home-screen.png' alt='Android how to pin website to homescreen' 
          height={100}
        />
        <div>3. after go to the Home Screen and open the app</div>
        <div>4. Click the browse button and select your vaccine passport photo</div>
        <input type='file' onChange={handleFileUpload}/>
        <div>5. It is now set and requires no further steps</div>
      </div>

      <h1>How to change the photo</h1>
      <div>
        <div>1. Click the browse button and select your new vaccine passport photo</div>
        <input type='file' onChange={handleFileUpload}/>
        <div>2. It is now set and requires no further steps</div>
      </div>

      <h3>Suggestions or bugs email me at dereklowlind@gmail.com</h3>
    </div>
  );
}

export default App;
