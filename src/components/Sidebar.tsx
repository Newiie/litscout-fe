import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <motion.div  
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="bg-[#2A2A2A] fixed top-0 left-0 w-full h-16 flex flex-row items-center justify-between px-2 py-2 z-40 md:flex-col md:w-16 md:h-full md:py-6 md:px-0 md:items-center md:justify-start md:top-0 md:left-0"
    >
      <div className="flex flex-row gap-4 md:flex-col md:gap-8 flex-1 items-center justify-start">
        <button
          onClick={() => router.push('/')}
          className="p-3 hover:bg-[#3A3A3A] rounded-lg transition-colors"
          title="Home"
        >
          <FaHome size={24} />
        </button>
        <button
          onClick={() => router.push('/history')}
          className="p-3 hover:bg-[#3A3A3A] rounded-lg transition-colors"
          title="Research History"
        >
          <FaHistory size={24} />
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="p-3 text-red-500 hover:bg-[#3A3A3A] rounded-lg transition-colors ml-auto md:ml-0"
        title="Logout"
      >
        <FaSignOutAlt size={24} />
      </button>
    </motion.div>
  );
}
