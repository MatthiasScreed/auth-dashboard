import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if(!email || !password) {
            setError('Remplis tous les champs')
            return
        }

        login(email, password)
        navigate('/dashboard')
    }

    return(
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem'}}>
           <h1>Connexion</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
}
