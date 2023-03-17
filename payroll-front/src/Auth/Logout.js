
import { useNavigate } from 'react-router-dom';
export default function Logout() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}
