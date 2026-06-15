export interface User{
    id: number
    name: string
    email:string
}

export interface AuthContextType{
    user:User | null
    login:(email: string, password: string) => void
    logout:() => void
}