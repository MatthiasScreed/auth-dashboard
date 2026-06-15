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
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-gray-400 hover:text-gray-700 transition"
                >
                    ← Retour
                </button>
                <h1 className="text-lg font-semibold text-gray-800">Mon profil</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-red-500 transition"
                >
                    Se déconnecter
                </button>
            </nav>

            {/* Contenu */}
            <div className="max-w-2xl mx-auto px-6 py-12">

                {/* Avatar + nom */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-indigo-500">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                </div>

                {/* Card infos */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                    <div className="flex justify-between items-center px-6 py-4 text-sm">
                        <span className="text-gray-400">ID</span>
                        <span className="text-gray-700 font-medium">{user?.id}</span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-4 text-sm">
                        <span className="text-gray-400">Nom</span>
                        <span className="text-gray-700 font-medium">{user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-4 text-sm">
                        <span className="text-gray-400">Email</span>
                        <span className="text-gray-700 font-medium">{user?.email}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}