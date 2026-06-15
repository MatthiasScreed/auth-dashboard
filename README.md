# Auth Dashboard

Application React + TypeScript avec authentification, routes protégées et dashboard utilisateur.

Projet d'apprentissage — **Jour 4** de la série React/TypeScript.

---

## Stack technique

- **React 19** — UI et gestion du state
- **TypeScript** — typage strict
- **Vite** — bundler et dev server
- **React Router DOM** — routing côté client
- **Tailwind CSS v4** — styling utilitaire

---

## Fonctionnalités

- Authentification fake (simulation sans backend)
- Routes protégées via `PrivateRoute`
- Persistance de session via `localStorage`
- Dashboard utilisateur
- Page de profil avec avatar initiales
- Déconnexion avec redirection

---

## Structure du projet

```
src/
├── types/
│   └── auth.ts               # Interfaces TypeScript : User, AuthContextType
├── contexts/
│   └── AuthContext.tsx        # createContext, AuthProvider, login, logout
├── hooks/
│   └── useAuth.ts             # Custom hook — accès au contexte Auth
├── components/
│   └── PrivateRoute.tsx       # Gardien des routes protégées
├── pages/
│   ├── Login.tsx              # Formulaire de connexion
│   ├── Dashboard.tsx          # Page principale (protégée)
│   └── Profile.tsx            # Profil utilisateur (protégée)
├── App.tsx                    # Assemblage : Router + Provider + Routes
└── main.tsx                   # Point d'entrée
```

---

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd auth-dashboard

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

---

## Utilisation

1. Arriver sur `/login` — redirection automatique si non connecté
2. Entrer n'importe quel email + mot de passe (login fake)
3. Accéder au Dashboard avec les infos utilisateur
4. Naviguer vers le Profil
5. Se déconnecter — retour sur `/login`
6. Rafraîchir la page — la session persiste grâce au `localStorage`

---

## Concepts clés appris

### Interfaces TypeScript

```ts
// types/auth.ts
export interface User {
  id: number
  name: string
  email: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}
```

`User | null` — union type : connecté ou non connecté. Toute la logique d'auth repose sur cette distinction.

---

### Context API + Provider

```tsx
// contexts/AuthContext.tsx
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  // ...
}
```

Le `useState` avec fonction d'initialisation (lazy initial state) lit `localStorage` **une seule fois** au montage — c'est ce qui permet la persistance au refresh.

---

### Custom hook

```ts
// hooks/useAuth.ts
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}
```

Encapsule `useContext` + la vérification `null`. Dans les composants : `const { user, login } = useAuth()` — une seule ligne.

---

### Route protégée

```tsx
// components/PrivateRoute.tsx
export function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (user === null) return <Navigate to="/login" replace />
  return <>{children}</>
}
```

`user === null` → redirige. Sinon → affiche la page. La logique de protection vit ici, pas dans les pages elles-mêmes.

---

### Assemblage dans App.tsx

```tsx
<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </AuthProvider>
</BrowserRouter>
```

**Ordre d'imbrication crucial** — `AuthProvider` à l'intérieur de `BrowserRouter` car `PrivateRoute` utilise `useNavigate` qui a besoin du Router. `path="*"` capture toutes les URLs inconnues.

---

## Notes importantes

**`import type`** — ce projet utilise `verbatimModuleSyntax` dans `tsconfig.json`. Les types doivent être importés séparément :
```ts
import type { User, AuthContextType } from '../types/auth'
```

**Login fake** — aucune validation réelle. Le paramètre `_password` est préfixé par `_` pour signaler à TypeScript qu'il est volontairement inutilisé.

**Persistance** — le user est sérialisé en JSON dans `localStorage` à la connexion et désérialisé au montage du Provider. La déconnexion nettoie la clé.

---

## Pistes d'évolution

- Ajouter une vraie API d'authentification (JWT)
- Implémenter un token d'expiration
- Ajouter un formulaire d'inscription
- Protéger selon les rôles utilisateur (`admin`, `user`)
- Extraire la logique `localStorage` dans un hook dédié `useLocalStorage`