const express = require("express")
const { authUser } = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()


/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume pdf and job description  
 * @access private
 */

interviewRouter.post("/", authUser, upload.single("resume"), interviewController.generateInterviewReportController)

interviewRouter.get("/report/:interviewId", authUser, interviewController.generateInterviewReportByIdController)

interviewRouter.get("/", authUser, interviewController.getAllInterviewReportsController)

module.exports = interviewRouter