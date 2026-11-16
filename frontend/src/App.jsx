import { useState } from "react";
import { analyzeResume } from "./api/resumeApi";
import Hero from "./components/Hero";
import InsightStrip from "./components/InsightStrip";
import Results from "./components/Results";
import UploadForm from "./components/UploadForm";

const initialStatus = "Upload a resume and job description to get started.";

export default function App() {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [status, setStatus] = useState(initialStatus);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!file) {
            setError("Please upload a PDF resume.");
            return;
        }

        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
            setError("Only PDF files are allowed.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please paste a job description.");
            return;
        }

        setIsLoading(true);
        setStatus("Extracting the PDF and comparing it with the job description...");

        try {
            const result = await analyzeResume({ file, jobDescription: jobDescription.trim() });
            setAnalysis({
                ...result,
                keywordCoverage: `${result.scoreBreakdown?.keywordCoverage ?? 0}%`,
                analysisSource: result.analysisSource === "fallback" ? "Fallback" : "Gemini",
                confidence: result.analysisConfidence?.level || "--",
            });
            setStatus(result.analysisConfidence?.note || "Analysis complete.");
        } catch (requestError) {
            setAnalysis(null);
            setStatus("Analysis failed.");
            setError(requestError.message || "Unable to analyze resume.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <main className="shell">
                <Hero score={analysis?.matchScore ?? null} status={status} />
                <InsightStrip analysis={analysis} />
                <section className="workspace">
                    <UploadForm
                        file={file}
                        jobDescription={jobDescription}
                        isLoading={isLoading}
                        onFileChange={(nextFile) => {
                            setFile(nextFile);
                            setError("");
                        }}
                        onJobDescriptionChange={setJobDescription}
                        onSubmit={handleSubmit}
                    />
                    <Results analysis={analysis} fileName={analysis?.fileName || file?.name} />
                </section>
            </main>
            <div className={`toast${error ? " show toast--error" : ""}`} role="alert" aria-live="polite">
                {error}
            </div>
        </>
    );
}
