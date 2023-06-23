import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  return (
    <div style={{margin: "2rem"}}>
      <div>
        <form action="/action_page.php">
          <label for="img">Select image:</label>
          <input type="file" id="img" name="img" accept="image/*" onChange={onSelectFile} />
          <input type="submit" />
        </form>
      </div>
      <div style={{maxWidth: "100vw", maxHeight: "100vh"}}>
        {selectedFile && <img src={preview} style={{maxWidth: "90vw", maxHeight: "90vh"}} alt="img preview" />}
      </div>
    </div>
  )
}

export default App;
