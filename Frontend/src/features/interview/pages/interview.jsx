import React, { useState, useEffect } from "react"  
import { useParams } from "react-router"              
import "../../../style/interview.scss"
import { useInterview } from "../hooks/useInterview"


const QuestionCard = ({ question, intention, answer, index }) => (
    <div className="question-card">
        <div className="question-header">
            <div className="q-number">{index + 1}</div>
            <p className="q-text">{question}</p>
        </div>
        <div className="question-meta">
            <div className="meta-row">
                <span className="meta-label intention">Intent</span>
                <span className="meta-text">{intention}</span>
            </div>
            <div className="meta-row">
                <span className="meta-label answer">Answer</span>
                <span className="meta-text">{answer}</span>
            </div>
        </div>
    </div>
)

const DayCard = ({ day, focus, tasks }) => (
    <div className="day-card">
        <div className="day-number">
            {day}
            <span className="day-label">Day</span>
        </div>
        <div className="day-content">
            <p className="day-focus">{focus}</p>
            <div className="day-tasks">
                {tasks.map((t, i) => (
                    <p key={i} className="task-item">{t}</p>
                ))}
            </div>
        </div>
    </div>
)

const MatchScoreRing = ({ score }) => {
    const radius = 46
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    const getCaption = (s) => {
        if (s >= 80) return "Strong match for this role"
        if (s >= 60) return "Good match for this role"
        return "Partial match for this role"
    }

    return (
        <div className="match-score-ring">
            <div className="ring-wrap">
                <svg viewBox="0 0 110 110">
                    <circle className="ring-bg" cx="55" cy="55" r={radius} />
                    <circle
                        className="ring-fill"
                        cx="55" cy="55" r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="ring-label">
                    <span className="ring-score">{score}</span>
                    <span className="ring-pct">%</span>
                </div>
            </div>
            <span className="ring-caption">{getCaption(score)}</span>
        </div>
    )
}

const Interview = () => {
    const [activeTab, setActiveTab] = useState("technical")
    const { report, getReportById } = useInterview()  
    const { interviewId } = useParams()                

    useEffect(() => {
        console.log("interviewId:", interviewId)
        if (interviewId) {
            getReportById(interviewId)  
        }
    }, [interviewId])

    if (!report) return <div className="loading">Loading your report...</div>

    const NAV = [
        { key: "technical",  icon: "⚙️", label: "Technical Questions", count: report.technicalQuestions.length },
        { key: "behavioral", icon: "🗣️", label: "Behavioral Questions", count: report.behavioralQuestions.length },
        { key: "roadmap",    icon: "🗺️", label: "Road Map",             count: report.preparationPlan.length }
    ]

    const renderContent = () => {
        switch (activeTab) {
            case "technical":
                return (
                    <>
                        <div className="section-header">
                            <h2>Technical Questions</h2>
                            <span className="section-count">{report.technicalQuestions.length} questions</span>
                        </div>
                        {report.technicalQuestions.map((q, i) => (
                            <QuestionCard key={i} index={i} {...q} />
                        ))}
                    </>
                )
            case "behavioral":
                return (
                    <>
                        <div className="section-header">
                            <h2>Behavioral Questions</h2>
                            <span className="section-count">{report.behavioralQuestions.length} questions</span>
                        </div>
                        {report.behavioralQuestions.map((q, i) => (
                            <QuestionCard key={i} index={i} {...q} />
                        ))}
                    </>
                )
            case "roadmap":
                return (
                    <>
                        <div className="section-header">
                            <h2>Preparation Road Map</h2>
                            <span className="section-count">{report.preparationPlan.length}-day plan</span>
                        </div>
                        {report.preparationPlan.map((d, i) => (
                            <DayCard key={i} {...d} />
                        ))}
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="interview">
            <div className="interview-topbar">
                <div className="topbar-title">
                    ✦ <span>Your <span className="highlight">Interview Strategy</span></span>
                </div>
                <div className="match-badge">
                    <span className="match-label">Match Score</span>
                    {report.matchScore}%
                </div>
            </div>

            <div className="interview-body">
                <nav className="sidebar">
                    <p className="sidebar-label">Sections</p>
                    {NAV.map(({ key, icon, label, count }) => (
                        <div
                            key={key}
                            className={`sidebar-item ${activeTab === key ? "active" : ""}`}
                            onClick={() => setActiveTab(key)}
                        >
                            <span className="item-icon">{icon}</span>
                            {label}
                            <span className="item-count">{count}</span>
                        </div>
                    ))}
                </nav>

                <main className="main-content">
                    {renderContent()}
                </main>

                <aside className="right-panel">
                    <div>
                        <p className="right-section-title">Match Score</p>
                        <MatchScoreRing score={report.matchScore} />
                    </div>

                    <div className="divider-line" />

                    <div>
                        <p className="right-section-title">Skill Gaps</p>
                        <div className="skill-gaps">
                            {report.skillGaps.map((g, i) => (
                                <div key={i} className={`skill-chip ${g.severity}`}>
                                    <span className="severity-dot" />
                                    <span className="skill-name">{g.skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="divider-line" />

                    <div>
                        <p className="right-section-title">Overview</p>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-label">Technical Qs</span>
                                <span className="stat-value">{report.technicalQuestions.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Behavioral Qs</span>
                                <span className="stat-value">{report.behavioralQuestions.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Prep Days</span>
                                <span className="stat-value">{report.preparationPlan.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Skill Gaps</span>
                                <span className="stat-value">{report.skillGaps.length}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview