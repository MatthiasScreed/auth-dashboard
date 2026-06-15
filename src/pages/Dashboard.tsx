import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export function Dashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem'}}>
            <h1>Dashboard</h1>
            <p>Bienvenue, <strong>{user?.name}</strong>!</p>
            <p>Email : {user?.email}</p>

            <button onClick={() => navigate('/profile')}>
                Mon profil
            </button>

            <button onClick={handleLogout} style={{ marginTop: '1rem'}}>
                Se déconnecter
            </button>
        </div>
    )
}