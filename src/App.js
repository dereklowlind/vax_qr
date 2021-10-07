import './App.css';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, 
  TextField, DialogActions, Button, IconButton,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import Instructions from './Instructions';

function App() {
  // dialog open states
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [toDelete, setToDelete] = useState(-1);
  const [imageName, setImageName]= useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [savedImages, setSavedImages] = useState(
    JSON.parse(localStorage.getItem('savedImages')) || []
    );

  const handleFileUpload = (e) => {
    // setImg
    const file = e.target.files[0];
    // console.log(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result);
    }
    reader.readAsDataURL(file);
    
    
  }

  const handleDeleteClicked = (index) => {
    setOpenDelete(true);
    setToDelete(index);
  }

  const handleDeleteImage = () => {
    savedImages.splice(toDelete, 1); // remove the selected index
    setSavedImages(savedImages);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    setOpenDelete(false);
    setToDelete(-1);
  }

  const handleAddImage = () => {
    const data =
      {
        "name": imageName,
        "imgSrc": imgSrc,
      };
    savedImages.push(data);
    setSavedImages(savedImages);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));  
    setOpenImage(false);
    setImageName("");
    setImgSrc(null);
  }


  const imageDialog = (
    <Dialog open={openImage} onClose={() => setOpenImage(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Image</DialogTitle>
      <DialogContent>
        <TextField
          // autoFocus
          margin="dense"
          id="image name"
          label="Image Name (Optional)"
          fullWidth
          value={imageName}
          placeholder=""
          onChange={(e) => setImageName(e.target.value)}
        />
        <input type='file'  accept="image/*" id="contained-button-file" style={{ display: 'none' }} onChange={handleFileUpload}/>
        <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" size="large" startIcon={<CloudUploadIcon />}>
          Upload
        </Button>
      </label>
        {imgSrc && (
              <img
                src={imgSrc} alt="qr code"
                width={'100%'} height={'100%'}
              />
            )}
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => {
              setOpenImage(false);
              setImageName("");
              setImgSrc(null);
          }} variant="contained">
              Cancel
        </Button>
        <Button 
          onClick={handleAddImage} 
          color="primary" variant="contained"
          startIcon={<SaveIcon />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )


  const deleteDialog = (
    <Dialog open={openDelete} onClose={() => setOpenDelete(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Delete Image</DialogTitle>
      <DialogContent>
        {(toDelete === -1)?
        <div>No images to delete</div>:
        <div>
          <div>{savedImages[toDelete].name}</div>
          <img
            src={savedImages[toDelete].imgSrc} alt="qr code"
            width={'50%'} height={'50%'}
          />
        </div>
      }
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => {
              setOpenDelete(false);
              setToDelete(-1);
          }}  variant="contained">
              Cancel
        </Button>
        <Button 
          onClick={handleDeleteImage} 
          variant="contained" color="secondary"
          startIcon={<DeleteIcon />}>
           Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <div className="App">
      {imageDialog}
      {deleteDialog}
      <Button variant="contained" color="primary"
      fullWidth="true" style={{marginTop: "10px"}}
      onClick={() => setOpenImage(true)}
      >
        Add New Image
      </Button>
      {
        savedImages.map((imageJson, index) => {
          return(
          <div key={index}>
            <IconButton onClick={() => handleDeleteClicked(index)}>
              <DeleteForeverIcon />
            </IconButton>
            
            <div>{imageJson.name}</div>
            <img
                  src={imageJson.imgSrc} alt="qr code"
                  width={'100%'} height={'100%'}
                />
          </div>
        )})
      }
      



    <Instructions setOpenImage={setOpenImage}/>
    </div>
  );
}

export default App;
