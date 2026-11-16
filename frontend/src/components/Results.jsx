const metrics = [
    ["keywordCoverage", "Keyword Coverage"],
    ["techFit", "Tech Fit"],
    ["impact", "Impact"],
    ["clarity", "Clarity"],
    ["roleFit", "Role Fit"],
    ["evidence", "Evidence"],
];

function List({ items, emptyLabel, className = "list" }) {
    return (
        <ul className={className}>
            {items?.length ? items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>) : <li>{emptyLabel}</li>}
        </ul>
    );
}

function ScoreBreakdown({ breakdown }) {
    return (
        <div className="metric-bars">
            {metrics.map(([key, label]) => {
                const value = Math.max(0, Math.min(100, Number(breakdown?.[key] || 0)));
                return (
                    <div className="metric-row" key={key}>
                        <div className="metric-row__head">
                            <span>{label}</span>
                            <strong>{value}%</strong>
                        </div>
                        <div className="metric-track">
                            <div className="metric-fill" style={{ width: `${value}%` }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function Card({ title, children, className = "" }) {
    return (
        <article className={`result-card ${className}`}>
            <h3>{title}</h3>
            {children}
        </article>
    );
}

export default function Results({ analysis, fileName }) {
    if (!analysis) {
        return (
            <section className="panel results">
                <div className="results-head">
                    <h2>Analysis Results</h2>
                    <span>Waiting for upload</span>
                </div>
                <div className="empty-results">Upload a PDF and add a job description to see your analysis.</div>
            </section>
        );
    }

    return (
        <section className="panel results">
            <div className="results-head">
                <h2>Analysis Results</h2>
                <span>{fileName || "Resume analyzed"}</span>
            </div>
            <div className="result-grid">
                <Card title="Summary" className="result-card--summary"><p>{analysis.summary || "No summary available."}</p></Card>
                <Card title="Score Breakdown"><ScoreBreakdown breakdown={analysis.scoreBreakdown} /></Card>
                <Card title="Strengths"><List items={analysis.strengths} emptyLabel="No strengths returned." /></Card>
                <Card title="Gaps"><List items={analysis.gaps} emptyLabel="No gaps returned." /></Card>
                <Card title="Missing Keywords"><List items={analysis.missingKeywords} emptyLabel="No missing keywords returned." className="chips" /></Card>
                <Card title="Matched Keywords"><List items={analysis.matchedKeywords} emptyLabel="No matched keywords returned." className="chips" /></Card>
                <Card title="Resume Bullet Points"><List items={analysis.resumeBulletPoints} emptyLabel="No bullet points returned." className="list bullets" /></Card>
                <Card title="Action Verbs"><List items={analysis.actionVerbs} emptyLabel="No action verbs returned." className="chips chips--verbs" /></Card>
            </div>
        </section>
    );
}
