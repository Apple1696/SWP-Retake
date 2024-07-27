import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function handleRedirect() {
    const navigate = useNavigate();
    const pickPromotion=()=>navigate('/pick-promotion')
    const handleLogoutConfirm=()=>navigate('/login')
    const payment=()=>navigate('/payment')
    return{
        pickPromotion,
        handleLogoutConfirm,
        payment,
    }
 
}
