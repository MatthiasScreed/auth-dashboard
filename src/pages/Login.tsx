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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-1">Connexion</h1>
                    <p className="text-sm text-gray-400 mb-6">
                        Bienvenue — connecte-toi pour continuer
                    </p>

                        {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex flex-col gap-1">Mot de passe</label>
                        <input type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="••••••••"
                               className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                        />
                    </div>

                    <button type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg py-2 text-sm transition mt-2"
                    >Se connecter</button>
                </form>
            </div>
        </div>
    )
}
