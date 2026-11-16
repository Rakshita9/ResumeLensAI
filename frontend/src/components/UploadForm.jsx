import { useRef, useState } from "react";

export default function UploadForm({ file, jobDescription, isLoading, onFileChange, onJobDescriptionChange, onSubmit }) {
    const inputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);

    function selectFile(nextFile) {
        if (nextFile) {
            onFileChange(nextFile);
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        setIsDragOver(false);
        selectFile(event.dataTransfer.files[0]);
    }

    return (
        <form className="panel" onSubmit={onSubmit}>
            <div className="field">
                <label htmlFor="resumeFile">Resume PDF</label>
                <div
                    className={`dropzone${isDragOver ? " is-dragover" : ""}`}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        id="resumeFile"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={(event) => selectFile(event.target.files[0])}
                    />
                    <div>
                        <strong>Drop your PDF here</strong>
                        <span>or click to browse</span>
                    </div>
                    <p id="fileName">{file ? file.name : "No file selected"}</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                    id="jobDescription"
                    rows="12"
                    value={jobDescription}
                    onChange={(event) => onJobDescriptionChange(event.target.value)}
                    placeholder="Paste the job description here..."
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Analyze Resume"}
            </button>
            <p className="hint">
                The app extracts text from the PDF, compares it to the job description, and returns structured feedback
                plus bullet points.
            </p>
        </form>
    );
}
