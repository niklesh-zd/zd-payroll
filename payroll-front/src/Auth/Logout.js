
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Logout() {
    const navigate = useNavigate();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    function handleLogout() {
        setShowLogoutDialog(true);

        // localStorage.removeItem('token');
        // navigate('/');
    }
    function handleLogoutConfirm() {
        // Perform the logout action here...
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
        setShowLogoutDialog(false);
    }

    function handleLogoutCancel() {
        setShowLogoutDialog(false);
    }

    function LogoutDialog(props) {
        return (
            <div  >
                <Toast>Do you really want to log out?</Toast>

                <button onClick={props.onConfirm}>Yes</button>
                <button onClick={props.onCancel}>No</button>
            </div>
        );
    }
    return (
        // <div style={{
        //     paddingLeft: "1100px",
        //     marginTop: "10px"
        // }}>
        //     <button onClick={handleLogout}>Logout</button>
        // </div>
        <div style={{
            paddingLeft: "1100px",
            marginTop: "25px"
        }}>
            <button onClick={handleLogout}>Log out</button>
            {showLogoutDialog && (
                <LogoutDialog
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                />
            )}
        </div>

    );
}


