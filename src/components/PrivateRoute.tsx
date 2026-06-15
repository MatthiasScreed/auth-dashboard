import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import type {ReactNode} from "react";

interface Props {
    children: ReactNode
}

export function PrivateRoute({ children }: Props) {
    const { user } = useAuth()

    if(user === null) {
        return <Navigate to="/login" replace />
    }

    return <>{ children }</>
}