import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export function Profile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return(
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem'}}>
            <h1>Mon profil</h1>

            <div style={{ marginBottom: '1rem'}}>
                <p><strong>Nom :</strong> {user?.name}</p>
                <p><strong>Email :</strong> {user?.email}</p>
                <p><strong>ID :</strong> {user?.id}</p>
            </div>

            <button onClick={() => navigate('/dashboard')}>
                Retour au dashboard
            </button>

            <button onClick={handleLogout} style={{ marginLeft: '1rem'}}>
                Se déconnecter
            </button>
        </div>
    )
}