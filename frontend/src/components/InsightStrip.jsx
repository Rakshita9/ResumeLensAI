const insights = [
    ["ATS Readiness", "atsReadiness", "--"],
    ["Resume Headline", "resumeHeadline", "Waiting for analysis"],
    ["Keyword Coverage", "keywordCoverage", "--%"],
    ["Analysis Source", "analysisSource", "--"],
    ["Confidence", "confidence", "--"],
];

export default function InsightStrip({ analysis }) {
    return (
        <section className="insight-strip">
            {insights.map(([label, key, emptyValue]) => (
                <article className="insight-tile" key={key}>
                    <span>{label}</span>
                    <strong>{analysis ? analysis[key] || emptyValue : emptyValue}</strong>
                </article>
            ))}
        </section>
    );
}
