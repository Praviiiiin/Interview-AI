const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            description: "The job title extracted from the job description"
        },
        matchScore: {
            type: "number",
            description: "A score between 0 and 100 indicating how well the candidate's resume matches the job description"
        },
        technicalQuestions: {
            type: "array",
            description: "Technical questions that can be asked in the interview",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The technical question to be asked" },
                    intention: { type: "string", description: "The intention behind asking this question" },
                    answer: { type: "string", description: "How to answer this question effectively" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "Behavioral questions that can be asked in the interview",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The behavioral question to be asked" },
                    intention: { type: "string", description: "The intention behind asking this question" },
                    answer: { type: "string", description: "How to answer this question effectively" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "array",
            description: "Skill gaps the candidate needs to address before the interview",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "The skill the candidate is lacking" },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "How critical this gap is"
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            description: "A daily preparation plan for the interview",
            items: {
                type: "object",
                properties: {
                    day: { type: "number", description: "The day number in the plan" },
                    focus: { type: "string", description: "The main focus for that day" },
                    tasks: {
                        type: "array",
                        description: "Tasks to complete that day",
                        items: { type: "string" }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",  
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema,
        }
    })

    const result = JSON.parse(response.text)
    console.log(result)
    return result
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, {waitUntil: "networkidle0"})

    const pdfBuffer = await page.pdf({
        format:"A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        } 
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf ({resume, selfDescription, jobDescription}) {
    const resumePdfSchema =  {
        type: "object",
        properties: {
            html: {
                type: "string",
                description: "The HTML content of the resume which can be converted to PDF using library like puppeteer"
            }
        },
        required: ["html"]
     }

    const prompt = `Generate a resume for a candidate with the following details:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}
    
    The response should be a JSON object with a single field "html" which contains the HTML content of the resume.
    
    IMPORTANT FORMATTING RULES:
    - The very first heading at the top must be the candidate's FULL NAME, not their job title
    - Put the job title/role BELOW the name in a smaller font
    - Extract the candidate's name from their resume or self description
    - If no name is found, use "Your Name" as a placeholder
    - DO NOT leave any empty spaces or blank sections between content
    - DO NOT add placeholder sections with no content
    - Only include sections that have actual content to show
    - Make sure project descriptions appear directly below the project title with no gaps
    
    The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read.
    The content of the resume should not sound like it was generated by AI and should be as close as possible to a real human-written resume.
    You can highlight the content using some colors or different font styles but the overall design should be simple and professional.
`
                        
const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: resumePdfSchema
    }
})

const jsonContent = JSON.parse(response.text)

const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

return pdfBuffer
    
}

module.exports = { generateInterviewReport, generateResumePdf }
