import { useState } from "react";
import { FiHome, FiSearch, FiBell, FiMail, FiSend } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router";
import ModalPostTweet from "../../pages/postTweet/components/ModalPostTweet";
import { useSelector } from "react-redux";

const NavBar = () => {
  const userId = useSelector((state) => state.auth.userId);
  console.log("userId dans navbar : ", userId)
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 bg-gray-50 dark:bg-black`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="/images/twitter.jpg"
                  className="w-16 h-auto mb-4 mx-auto block"
                  alt="Logo"
                />
              </a>
            </li>
            <li>
              <NavLink to="/home" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiHome />
                <span className="ms-3">Accueil</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Messages" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiMail />
                <span className="ms-3">Messages</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Notifications" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiBell />
                <span className="ms-3">Notifications</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
              >
                <FiSend />
                <span className="ms-3">Poster</span>
              </button>
            </li>
            <li>
              <NavLink
                to={`/profile/${userId}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CgProfile />
                <span className="ms-3">Profil</span>
              </NavLink>

            </li>
          </ul>
        </div>
      </aside>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-1000">
          {/* <div className="bg-black text-white p-6 rounded-lg shadow-lg w-120 relative bg-opacity-70">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-transparent border-0"
            >
              <FiX className="w-6 h-6" />
            </button>

            <div className="flex mt-4">
              <CgProfile className="w-10 h-10 text-white mr-2" />
              <textarea className="w-full h-32 p-2 border rounded-md bg-black text-white" placeholder="Quoi de neuf ?!" 
                onChange={(e) => setTweet(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outlined" className="w-full rounded" type="submit" onClick={postTweet}>
                Poster
              </Button>
            </div>
          </div> */}
          <ModalPostTweet setIsModalOpen={setIsModalOpen} />
        </div>
      )}

    </div>
  );
};

export default NavBar;
