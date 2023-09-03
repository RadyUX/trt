import React, { useState } from 'react';

interface SidebarProps {
    isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isLoggedIn }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    return (
        <div className="fixed top-0 right-0 w-64 h-full p-4 bg-gray-200">
            {!isLoggedIn ? (
                <>
                    <button className="w-full px-4 py-2 mb-2 text-white bg-blue-600 rounded" onClick={handleClick}>Sign Up</button>
                    <button className="w-full px-4 py-2 text-white bg-blue-600 rounded">Sign In</button>
                </>
            ) : (
                <button className="w-full px-4 py-2 text-white bg-blue-600 rounded" onClick={handleClick}>Complete Profile</button>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="p-4 bg-white rounded shadow-lg">
                        <form>
                            <div className="mb-4">
                                <label>Name:</label>
                                <input type="text" className="w-full p-2 mt-1 border rounded"/>
                            </div>
                            <div className="mb-4">
                                <label>Email:</label>
                                <input type="email" className="w-full p-2 mt-1 border rounded"/>
                            </div>
                            <div className="mb-4">
                                <label>Qui etes vous?</label>
                                <select className="w-full p-2 mt-1 border rounded">
                                    <option value="recruteur">Recruteur</option>
                                    <option value="candidat">Candidat</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white bg-green-600 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
