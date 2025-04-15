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
      className="w-16 bg-[#2A2A2A] h-full flex flex-col items-center py-6"
    >
      <div className="flex-1 flex flex-col items-center gap-8">
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
        className="p-3 text-red-500 hover:bg-[#3A3A3A] rounded-lg transition-colors"
        title="Logout"
      >
        <FaSignOutAlt size={24} />
      </button>
    </motion.div>
  );
}
