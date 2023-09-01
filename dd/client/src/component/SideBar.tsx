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
        <div className="fixed right-0 top-0 h-full w-64 bg-gray-200 p-4">
            {!isLoggedIn ? (
                <>
                    <button className="mb-2 w-full py-2 px-4 bg-blue-600 text-white rounded" onClick={handleClick}>Sign Up</button>
                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded">Sign In</button>
                </>
            ) : (
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded" onClick={handleClick}>Complete Profile</button>
            )}

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <form>
                            <div className="mb-4">
                                <label>Name:</label>
                                <input type="text" className="mt-1 p-2 w-full border rounded"/>
                            </div>
                            <div className="mb-4">
                                <label>Email:</label>
                                <input type="email" className="mt-1 p-2 w-full border rounded"/>
                            </div>
                            <div className="mb-4">
                                <label>Role:</label>
                                <select className="mt-1 p-2 w-full border rounded">
                                    <option value="recruteur">Recruteur</option>
                                    <option value="candidat">Candidat</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
