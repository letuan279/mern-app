import { Route, Routes, Navigate } from 'react-router-dom'
import Auth from './components/Auth'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Course from './components/Course'
import About from './components/About'
import AuthContextProvider from './contexts/AuthContext'
import RequireAuth from './components/RequireAuth'
import CourseContextProvider from './contexts/CourseContext'
import './App.css'

function App() {

  return (
    <AuthContextProvider>
      <CourseContextProvider>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Auth />}>
              <Route path='/' element={<Navigate to="/login" />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path='/dashboard' element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='course' element={<Course />} />
                <Route path='about' element={<About />} />
              </Route>
              <Route
                path="*"
                element={<Navigate to="/dashboard" />}
              />
            </Route>
            <Route
              path="*"
              element={<Navigate to="/login" />}
            />
          </Routes>
        </div>
      </CourseContextProvider>
    </AuthContextProvider>

  )

}

export default App