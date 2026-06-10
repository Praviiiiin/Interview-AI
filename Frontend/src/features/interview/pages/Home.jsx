import React, { useState, useRef, useEffect } from "react"
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'  

const Home = () => {

    const { generateReport, reports, getReports } = useInterview()  
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState(null)  
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getReports()
    }, [])

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        console.log("data:", data)
        if (!data) {
            alert("Report generation failed - check backend terminal")
            return
        }
        navigate(`/interview/${data._id}`)  
    }

    const handleFileChange = (e) => {
        if (e.target.files[0]) setFileName(e.target.files[0].name)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        if (e.dataTransfer.files[0]) setFileName(e.dataTransfer.files[0].name)
    }

    return (
        <main className="home">
            <div className="home-wrapper">
                <div className="home-header">
                    <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
                    <p className="subtitle">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </div>

                <div className="interview-input-group">

                    <div className="left panel">
                        <div className="panel-header">
                            <div className="panel-title">
                                <span className="icon-wrap danger">📋</span>
                                <span>Target Job Description</span>
                            </div>
                            <span className="badge required">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            name="jobDescription"
                            id="jobDescription"
                            placeholder={"Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"}
                            value={jobDescription}
                            maxLength={5000}
                        />
                        <div className="char-count">{jobDescription.length} / 5000 chars</div>
                    </div>

                    <div className="right panel">
                        <div className="panel-header">
                            <div className="panel-title">
                                <span className="icon-wrap">👤</span>
                                <span>Your Profile</span>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="group-label">
                                Upload Resume <span className="highlight small">(Best Results)</span>
                            </label>
                            <label
                                className="drop-zone"
                                htmlFor="resume"
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="drop-icon">⬆</div>
                                <p className="drop-text">
                                    {fileName ? fileName : "Click to upload or drag & drop"}
                                </p>
                                <p className="drop-sub">PDF or DOCX (Max 5MB)</p>
                            </label>
                            <input
                                ref={resumeInputRef}
                                hidden
                                type="file"
                                name="resume"
                                id="resume"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="divider"><span>OR</span></div>

                        <div className="input-group">
                            <label className="group-label" htmlFor="selfDescription">Quick Self-Description</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                value={selfDescription}
                            />
                        </div>

                        <div className="info-box">
                            <span className="info-dot">ℹ</span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bar">
                    <span className="footer-note">AI-Powered Strategy Generation • Approx 30s</span>
                    <button onClick={handleGenerateReport} className="generate-btn">✦ Generate My Interview Strategy</button>
                </div>

                {reports.length > 0 && (
                    <section className='recent-reports'>
                        <h2>My Recent Interview Plans</h2>
                        <ul className='reports-list'>
                            {reports.map(report => (
                                <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>
                                        {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                     </p>
                                     <div className="card-footer">
                                            <span className="score-label">Match</span>
                                            <span className={`score-badge ${report.matchScore >= 80 ? 'score-high' : report.matchScore >= 60 ? 'score-mid' : 'score-low'}`}>
                                                {report.matchScore}%
                                             </span>
                                        </div>
                                    </li>
                            ))}
                        </ul>
                    </section>
                )}

            </div>
        </main>
    )
}

export default Home