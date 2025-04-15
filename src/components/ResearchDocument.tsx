import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import Link from 'next/link';


interface Citation {
  authors: string;
  title: string;
  year: string;
  url: string;
  formatted: string;
  journal_info: string | null;
}

interface ResearchDocumentProps {
  title: string;
  researchTopic: string;
  summary: string;
  citations: Citation[];
}

const ResearchDocument: React.FC<ResearchDocumentProps> = ({
  title,
  researchTopic,
  summary,
  citations
}) => {
  const exportToWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, size: 32 })]
          }),
          new Paragraph({
            children: [new TextRun({ text: `Research Topic: ${researchTopic}`, size: 24 })]
          }),
          new Paragraph({ children: [] }), // Empty line
          new Paragraph({
            children: [new TextRun({ text: 'Research Summary', bold: true, size: 24 })]
          }),
          new Paragraph({
            children: [new TextRun({ text: summary })]
          }),
          new Paragraph({ children: [] }), // Empty line
          new Paragraph({
            children: [new TextRun({ text: 'References', bold: true, size: 24 })]
          }),
          ...citations.map(citation =>
            new Paragraph({
              children: [new TextRun({ text: citation.formatted })]
            })
          )
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title.replace(/[^a-zA-Z0-9]/g, '_')}_research.docx`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <h2 className="text-xl text-gray-700">Research Topic: {researchTopic}</h2>
      </div>

      {/* Summary Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Summary</h3>
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {summary}
        </div>
      </section>

      {/* Citations Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">References</h3>
        <div className="space-y-4">
          {citations.map((citation, index) => (
            <div key={index} className="text-gray-700 flex items-start gap-2">
              <p className="mb-2">{citation.formatted.replace(citation.url, '').trim()} {" "} 
                <Link
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  title="Visit source"
                >
                  {citation.url}
                </Link>
              </p>

            </div>
          ))}
        </div>
      </section>

      {/* Export Button */}
      <div className="mt-8 text-center">
        <button
          onClick={exportToWord}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Export to Word
        </button>
      </div>
    </div>
  );
};

export default ResearchDocument;
