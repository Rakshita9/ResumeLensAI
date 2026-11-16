const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export async function analyzeResume({ file, jobDescription }) {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    const response = await fetch(`${apiBaseUrl}/api/analyze-resume`, {
        method: "POST",
        body: formData,
    });

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error("The server returned an invalid response.");
    }

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Analysis failed.");
    }

    return data;
}
