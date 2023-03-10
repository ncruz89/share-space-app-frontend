import React, { useRef, useState, useEffect } from "react";

import Button from "../Button/Button.component";

import "./ImageUpload.styles.css";

// ImageUploader Component
// receives multiple props
// handles file, previewUrl and isValid states
// once file state is set/updated useEffect runs new FileReader() instance
// fileReader then reads file and sets previewUrl state
// renders image preview and pick image button
const ImageUploader = ({ id, center, onInput, errorText }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
  }, [file]);

  // pickImageHandler
  // simulates click event on element that's referencing filePickerRef
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  // pickedHandler
  // gathers pickedFile from event.target
  // sets file and isValid state
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePickerRef}
        id={id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUploader;
