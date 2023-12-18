import React, { useState } from "react";

function FileUploadForm({ handleFileUpload, images }) {
  const [files, setFiles] = useState([]);
  let dataImages = [];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFiles([...files, selectedFile]);
      handleFileUpload(selectedFile);
    }
  };

  if (files.length === 0 && images && images.length > 0) {
    images.find((image) => {
      dataImages.push(`data:image/jpeg;base64, ${image.productImage}`);
    });

    setFiles(dataImages);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 h-fit w-full my-4">
      {files.map((file, index) => (
        <div
          key={index}
          className="w-28 h-24 rounded-md flex items-center justify-center cursor-pointer"
        >
          <img
            src={images ? file : URL.createObjectURL(file)}
            alt={`Selected Image ${index}`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ))}

      <label className="w-28 h-24 rounded-md border flex items-center justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col text-center items-center justify-center">
          <span className="material-symbols-outlined">add_photo_alternate</span>
          <span>Agregar Imagen</span>
        </div>
      </label>
    </div>
  );
}

export default FileUploadForm;
