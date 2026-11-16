export default function Hero({ score, status }) {
    return (
        <section className="hero">
            <div className="hero-copy">
                <p className="eyebrow">AI Resume Analyzer</p>
                <h1>Compare your resume with a job description and generate better bullets.</h1>
                <p className="lede">
                    Upload a PDF resume, paste the job description, and get ATS-style feedback with matched keywords,
                    gaps, resume bullets, and unique career-fit insights.
                </p>
                <div className="hero-pills">
                    <span>PDF upload</span>
                    <span>Job match score</span>
                    <span>Headline + readiness</span>
                </div>
            </div>
            <div className="hero-card">
                <div className="score-ring">
                    <div>
                        <span>{score === null ? "--" : score}</span>
                        <small>Match Score</small>
                    </div>
                </div>
                <p>{status}</p>
            </div>
        </section>
    );
}
