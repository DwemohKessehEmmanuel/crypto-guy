import React from 'react'
import { Navigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'


const ProtectRoute = ({children}) => {
  const {user} = CryptoState()

    if (!user){
        return <Navigate to='login' />
    }
    return children
}

export default ProtectRoute
