import React, { useState } from "react"
import "../style/home.scss"

const Home = () => {
    const [jobDesc, setJobDesc] = useState("")
    const [selfDesc, setSelfDesc] = useState("")
    const [fileName, setFileName] = useState(null)

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
                            name="jobDescription"
                            id="jobDescription"
                            placeholder={"Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"}
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            maxLength={5000}
                        />
                        <div className="char-count">{jobDesc.length} / 5000 chars</div>
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
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                value={selfDesc}
                                onChange={(e) => setSelfDesc(e.target.value)}
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
                    <button className="generate-btn">✦ Generate My Interview Strategy</button>
                </div>
            </div>
        </main>
    )
}

export default Home