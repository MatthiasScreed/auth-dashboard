import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"
import { PrivateRoute } from "./components/PrivateRoute"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { Profile } from "./pages/Profile"
function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login/>}/>

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              }
            />

            <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App