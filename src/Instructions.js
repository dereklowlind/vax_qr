import { Button } from "@material-ui/core";

function Instructions(props) {
    return(
        <>
        <h1>Instructions</h1>
        <div>
          <div>1. Open the App (preferably in safari if IOS and chrome if Android)</div>
          <div>2. Click the share button, and click add to Home Screen.</div>
          <div className="ImageContainer">
            <img src='1-pin-website-to-iPhone.webp' alt='iOS how to pin website to homescreen' 
              height={100} style={{paddingRight: '20px'}}
            />
            <img src='android-chrome-menu-add-to-home-screen.png' alt='Android how to pin website to homescreen' 
              height={100} style={{paddingRight: '20px'}}
            />
            <p>(zoom in to read)</p>
          </div>
          <div>3. after go to the Home Screen and open the app</div>
          <div>4. Click the Add New Image button and select your vaccine passport photo</div>
                <Button variant="contained" color="primary" size="small"
                style={{marginLeft: "17px"}}
            onClick={() => props.setOpenImage(true)}
            >
                Add New Image
            </Button>
          <div>5. That is now set and requires no further steps</div>
          <div>6. Share Vax QR with friends and family by sharing</div>
          <a href="https://covidvaxqr.web.app/">https://covidvaxqr.web.app/</a>
          <div>https://covidvaxqr.web.app/</div>
        </div>

  
        <h3 style={{paddingBottom: '50px'}}>Suggestions or bugs email me at dereklowlind@gmail.com</h3>
        </>
    )
}
export default Instructions;