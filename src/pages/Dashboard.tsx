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
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-red-500 transition"
                >
                    Se déconnecter
                </button>
            </nav>
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
                    <p className="text-sm text-gray-400 mb-1">Connecté en tant que</p>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {user?.name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-4">
                        Informations du compte
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">ID</span>
                            <span className="text-gray-700 font-medium">{user?.id}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Nom</span>
                            <span className="text-gray-700 font-medium">{user?.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Email</span>
                            <span className="text-gray-700 font-medium">{user?.email}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/profile')}
                    className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl py-2.5 text-sm transition"
                >
                    Mon profil
                </button>

            </div>
        </div>
    )
}