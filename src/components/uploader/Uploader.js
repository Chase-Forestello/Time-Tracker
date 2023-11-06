import {useState, useEffect} from "react";

const Uploader = () => {
    const [file, setFile] = useState([]);
    const [content, setContent] = useState();

    useEffect(() => {
        setFile(null);
        console.log(`File cleared: ${file}`);
    }, [])

    async function readText(event) {
        const file = event.target.files.item(0)
        const text = await file.text();

        document.getElementById("output").innerText = text
    }

    useEffect(() => {
        console.log(`Content: ${content}`);
    }, [file]);
    const handleChangeGetFile = () => {
        console.log("Getting file");
        const userFile = document.querySelector("#formFile").files;
        setFile(userFile);
    }
    const readFile = async (uploadedFile) => {
        console.log(`Uploaded file: ${uploadedFile}`);
        const fileContent = await uploadedFile.text();
        setContent(fileContent)
    }

    return (
        <div id={"uploader-wrapper"} className={"container"}>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Default file input example</label>
                <input className="form-control" type="file" id="formFile" onChange={readText}/>
            </div>
            <div id={"output"} className={"card"}></div>
        </div>
    )
}

export default Uploader;