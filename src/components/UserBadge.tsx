// components/UserBadge.tsx
import React, { useState } from "react";
import { User } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/client";
import Link from "next/link";
import Modal from "./Modal";

const UserBadge: React.FC = () => {
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setShowModal(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleBadgeClick = () => {
    setShowModal(true);
  };

  if (user && user.email) {
    return (
      <>
        <div
          onClick={handleBadgeClick}
          className="absolute z-10 top-4 left-4 flex items-center bg-white rounded-full shadow-lg p-1 pr-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
        >
          <div className="size-8 rounded-full overflow-hidden mr-2">
            <div className="w-full h-full bg-blue-500 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-700 select-none">
            {user.email}
          </span>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="User Options"
        >
          <p className="mb-6 text-gray-600">
            You are currently logged in as {user.email}
          </p>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Sign Out
          </button>
        </Modal>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="absolute z-10 top-4 left-4 flex items-center bg-white rounded-full shadow-lg p-1 pr-4 hover:bg-gray-100 transition-colors duration-300"
      >
        <div className="size-8 rounded-full overflow-hidden mr-2">
          <div className="w-full h-full bg-gray-500 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
        <span className="text-xs font-medium text-gray-700 select-none">
          Login
        </span>
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Access More Features"
      >
        <p className="mb-6 text-gray-600">
          Log in to gain access to additional functionalities and personalized
          features.
        </p>
        <Link href="/login" passHref>
          <button
            onClick={() => setShowModal(false)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Go to Login Page
          </button>
        </Link>
      </Modal>
    </>
  );
};

export default UserBadge;
