
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const sections = [
  {
    title: 'About Litscout',
    img: '/ai-agent.avif',
    alt: 'About Litscout',
    content: (
      <p className="text-[1.15rem] text-gray-300">
        <strong>Litscout</strong> is your intelligent assistant for generating Review of Related Literature (RRL) documents. Simply provide your research topic or keywords, and Litscout will leverage cutting-edge AI to generate a comprehensive, relevant, and well-structured RRL tailored to your needs.
      </p>
    ),
  },
  {
    title: 'Our Mission',
    img: '/mission.jpg',
    alt: 'Mission',
    content: (
      <p className="text-[1.15rem] text-gray-300">
        Our mission is to empower students, researchers, and professionals by simplifying and elevating the literature review process. We strive to provide accessible, AI-driven tools that enable users to produce insightful, high-quality RRLs with ease and confidence, so they can focus on making meaningful contributions to their fields.
      </p>
    ),
  },
  {
    title: 'Our Vision',
    img: '/vision.jpg',
    alt: 'Vision',
    content: (
      <p className="text-[1.15rem] text-gray-300">
        Our vision is to revolutionize academic research by making literature review effortless, insightful, and accessible for everyone. We aim to be the go-to platform for generating high-quality RRLs, empowering students, researchers, and professionals to focus on what truly matters: advancing knowledge.
      </p>
    ),
  },
  {
    title: 'How It Works',
    img: '/hiw.jpg',
    alt: 'How It Works',
    content: (
      <ul className="text-[1.05rem] text-gray-300 list-disc pl-6">
        <li><strong>Retrieval-Augmented Generation (RAG):</strong> Combines search and advanced language models for accurate, up-to-date RRLs.</li>
        <li><strong>Pinecone:</strong> Enables fast, relevant literature retrieval from a vast database using vector search.</li>
        <li><strong>LangChain:</strong> Orchestrates the workflow and integrates the components seamlessly.</li>
        <li><strong>GPT:</strong> Powers the natural language generation for coherent, well-written, and academically sound RRLs.</li>
      </ul>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 font-sans bg-[#1E1E1E] text-white">
      {sections.map((section, idx) => (
        <motion.section
          key={section.title}
          className={`flex flex-wrap items-center gap-10 my-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src={section.img}
            alt={section.alt}
            width={180}
            height={180}
            className="w-[180px] h-[180px] object-cover rounded-2xl bg-gray-700"
          />
          <div className="flex-1 min-w-[220px]">
            <h2 className="text-[2rem] font-bold text-blue-400 mb-4">{section.title}</h2>
            {section.content}
          </div>
        </motion.section>
      ))}

      <motion.section
        className="mt-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-[2rem] font-bold text-blue-400 text-center mb-10">Meet the Team</h2>
        <div className="flex justify-center gap-10 flex-wrap">
          {[
            { name: 'Dr. Adviser Name', role: 'Adviser', img: '/adviser.jpg' },
            { name: 'Student One', role: 'Presenter / Developer', img: '/team-student1.png' },
            { name: 'Student Two', role: 'Presenter / Developer', img: '/team-student2.png' },
          ].map((member) => (
            <div key={member.name} className="flex flex-col items-center w-44">
              <Image
                src={member.img}
                alt={member.name}
                width={112}
                height={112}
                className="w-28 h-28 rounded-full object-cover bg-gray-600 mb-3"
              />
              <div className="font-semibold text-[1.15rem] mb-1">{member.name}</div>
              <div className="text-gray-400 text-sm">{member.role}</div>
            </div>
          ))}
        </div>
      </motion.section>

      <p className="text-[1.1rem] text-gray-400 text-center mt-12 italic">
        Built with ❤️ by the Litscout Team
      </p>
    </main>
  );
};

export default AboutPage;
