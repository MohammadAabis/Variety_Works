import React, { useState } from 'react';


const FileUpload = () => {
    const [fileData, setFileData] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        // Create a new FormData object and append the single file
        const formData = new FormData();
        formData.append("file", file);
        setFileData(formData)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // fileUpload(fileData)
        // .then(response => {
        //     console.log(response.data);
        // })
        // .catch(error => {
        //     console.log(error);
        // });       

    };    

    return (
        <form>
            <label>
                <input type="file" name="image" className="hidden" onChange={(e) => handleFileChange(e)} />
                <span className="w-12 h-12 bg-center bg-cover rounded-full">
                </span>
                <br />
                <button onClick={handleSubmit}>Upload Image</button>                
            </label>
        </form>
    );
};

export default FileUpload;
