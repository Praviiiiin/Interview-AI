import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import AnimatedBackground from "./components/AnimatedBackground.jsx"

function App() {
  
  return (
    <AuthProvider>
      <InterviewProvider>
        <AnimatedBackground />
        <RouterProvider router ={router} />
      </InterviewProvider>      
    </AuthProvider>
  )
}

export default App
