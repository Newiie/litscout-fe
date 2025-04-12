/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import ResearchDocument from '@/components/ResearchDocument';

interface ResearchProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Research({ params }: ResearchProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [research, setResearch] = useState<any>(null);
  const [isLoadingResearch, setIsLoadingResearch] = useState(true);
  const paramsData = use(params);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/research/${paramsData.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch research');
        }

        const data = await response.json();
        setResearch(data.research);
      } catch (error) {
        console.error('Error fetching research:', error);
        router.push('/history');
      } finally {
        setIsLoadingResearch(false);
      }
    };

    if (user) {
      fetchResearch();
    }
  }, [user, paramsData.id, router]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <main className="fixed inset-0 flex bg-[#1E1E1E] text-white h-screen ">
      <Sidebar />
      <div className="flex-1 py-8 px-8 overflow-y-auto">
        <div className="flex w-full gap-4">
          <motion.div 
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-y-auto w-full content"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">Research Details</h1>
              <button
                onClick={() => router.push('/history')}
                className="text-blue-500 hover:text-blue-400"
              >
                Back to History
              </button>
            </div>

            {isLoadingResearch ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : research ? (
              <ResearchDocument
                title={research.title}
                researchTopic={research.research_topic}
                summary={research.summary}
                citations={research.citations}
              />
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p className="text-xl">Research not found</p>
                <button
                  onClick={() => router.push('/history')}
                  className="mt-4 text-blue-500 hover:text-blue-400"
                >
                  Return to History
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
