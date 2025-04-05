/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';

interface SavedResearch {
  _id: string;
  title: string;
  research_topic: string;
  summary: string;
  citations: any[];
  search_params: any;
  created_at: string;
}

export default function History() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [savedResearches, setSavedResearches] = useState<SavedResearch[]>([]);
  const [isLoadingResearches, setIsLoadingResearches] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchSavedResearches = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token ", token)
        const response = await fetch('http://127.0.0.1:5000/saved_researches', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch saved researches');
        }

        const data = await response.json();
        setSavedResearches(data.researches);
      } catch (error) {
        console.error('Error fetching saved researches:', error);
      } finally {
        setIsLoadingResearches(false);
      }
    };

    if (user) {
      fetchSavedResearches();
    }
  }, [user, router]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <main className="fixed inset-0 flex bg-[#1E1E1E] text-white h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 py-8 px-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">Research History</h1>
        {isLoadingResearches ? (
          <div key="loading" className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : savedResearches.length === 0 ? (
          <div key="empty" className="text-center text-gray-400 py-12">
            <p className="text-xl">No saved researches found</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 text-blue-500 hover:text-blue-400"
            >
              Start a new research
            </button>
          </div>
        ) : (
          <div key="research-list" className="grid gap-6">
            {savedResearches.map((research) => (
              <div
                key={research._id}
                className="bg-[#2A2A2A] rounded-lg p-6 hover:bg-[#3A3A3A] transition-colors cursor-pointer"
                onClick={() => router.push(`/research/${research._id}`)}
              >
                <h2 className="text-2xl font-semibold mb-2">{research.title}</h2>
                <p className="text-gray-400 mb-4">Research Topic: {research.research_topic}</p>
                <p className="text-sm text-gray-500">
                  Created on: {new Date(research.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
