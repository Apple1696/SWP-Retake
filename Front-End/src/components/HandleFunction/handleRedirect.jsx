import { useNavigate } from 'react-router-dom';

export default function handleRedirect() {
    const navigate = useNavigate();
    // const pickPromotion=()=>navigate('/pick-promotion')
    const handleLogoutConfirm=()=>navigate('/login')
    const payment=()=>navigate('/payment')
    const createOrder=()=>navigate('/create-order')
    const cancelOrder=()=>navigate('/order-report')
    
    return{
        // pickPromotion,
        handleLogoutConfirm,
        payment,
        createOrder,
        cancelOrder,

    }
 
}
