import { useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "../tokens";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  FileText,
  Search,
  Download,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  size: string;
  date: string;
  pages: number;
}

const documents: Document[] = [
  {
    id: "1",
    name: "Introduction_to_Calculus.pdf",
    teacher: "Dr. Emily Chen",
    subject: "Mathematics",
    size: "2.4 MB",
    date: "Sep 1, 2026",
    pages: 24,
  },
  {
    id: "2",
    name: "Cell_Biology_Fundamentals.pdf",
    teacher: "Ms. Sarah Johnson",
    subject: "Biology",
    size: "4.1 MB",
    date: "Aug 28, 2026",
    pages: 38,
  },
  {
    id: "3",
    name: "World_War_II_Timeline.pdf",
    teacher: "Mr. Robert Brown",
    subject: "History",
    size: "1.8 MB",
    date: "Aug 25, 2026",
    pages: 16,
  },
  {
    id: "4",
    name: "Shakespeare_Macbeth_Guide.pdf",
    teacher: "Mrs. Lisa Davis",
    subject: "Literature",
    size: "3.2 MB",
    date: "Aug 20, 2026",
    pages: 42,
  },
  {
    id: "5",
    name: "Organic_Chemistry_Basics.pdf",
    teacher: "Dr. James Wilson",
    subject: "Chemistry",
    size: "5.6 MB",
    date: "Aug 15, 2026",
    pages: 56,
  },
  {
    id: "6",
    name: "Python_Programming_Intro.pdf",
    teacher: "Ms. Anna Garcia",
    subject: "Computer Science",
    size: "2.9 MB",
    date: "Aug 10, 2026",
    pages: 30,
  },
];

export default function ViewerPage() {
  const [search, setSearch] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  const filtered = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.subject.toLowerCase().includes(search.toLowerCase()) ||
      d.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const openDoc = (doc: Document) => {
    setSelectedDoc(doc);
    setCurrentPage(1);
    setZoom(100);
  };

  const closeDoc = () => {
    setSelectedDoc(null);
  };

  return (
    <div className="min-h-screen px-4 py-20" style={{ backgroundColor: tokens.color.muted }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!selectedDoc ? (
            <>
              <div className="mb-8">
                <button
                  onClick={() => { window.location.href = "/"; }}
                  className="inline-flex items-center gap-2 text-sm mb-4 hover:opacity-70 cursor-pointer"
                  style={{ color: tokens.color.mutedForeground }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </button>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
                >
                  Document Library
                </h1>
                <p style={{ color: tokens.color.mutedForeground }}>
                  Browse and view all course materials shared by your teachers.
                </p>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: tokens.color.mutedForeground }}
                />
                <input
                  type="text"
                  placeholder="Search by document name, subject, or teacher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border pl-12 pr-4 py-3 text-base outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{
                    backgroundColor: tokens.color.background,
                    borderColor: tokens.color.border,
                    color: tokens.color.text,
                  }}
                />
              </div>

              {/* Document Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((doc) => (
                  <Card
                    key={doc.id}
                    hover
                    className="cursor-pointer"
                    onClick={() => openDoc(doc)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: tokens.color.primary }}
                      >
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="font-semibold text-sm truncate"
                          style={{ color: tokens.color.text }}
                        >
                          {doc.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: tokens.color.mutedForeground }}>
                          {doc.subject} • {doc.teacher}
                        </p>
                        <p className="text-xs mt-1" style={{ color: tokens.color.mutedForeground }}>
                          {doc.size} • {doc.pages} pages • {doc.date}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <FileText
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: tokens.color.border }}
                  />
                  <p className="font-semibold" style={{ color: tokens.color.text }}>
                    No documents found
                  </p>
                  <p className="text-sm" style={{ color: tokens.color.mutedForeground }}>
                    Try adjusting your search terms.
                  </p>
                </div>
              )}
            </>
          ) : (
            /* PDF Viewer */
            <div className="flex flex-col h-[calc(100vh-160px)]">
              {/* Viewer Toolbar */}
              <div
                className="flex items-center justify-between p-4 rounded-t-2xl border"
                style={{
                  backgroundColor: tokens.color.background,
                  borderColor: tokens.color.border,
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={closeDoc}
                    className="hover:opacity-70 cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" style={{ color: tokens.color.text }} />
                  </button>
                  <div className="min-w-0">
                    <p
                      className="font-semibold text-sm truncate"
                      style={{ color: tokens.color.text }}
                    >
                      {selectedDoc.name}
                    </p>
                    <p className="text-xs" style={{ color: tokens.color.mutedForeground }}>
                      {selectedDoc.teacher} • {selectedDoc.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom((z) => Math.max(50, z - 25))}
                    className="p-2 rounded-lg hover:opacity-70 cursor-pointer"
                    style={{ color: tokens.color.text }}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium w-12 text-center" style={{ color: tokens.color.text }}>
                    {zoom}%
                  </span>
                  <button
                    onClick={() => setZoom((z) => Math.min(200, z + 25))}
                    className="p-2 rounded-lg hover:opacity-70 cursor-pointer"
                    style={{ color: tokens.color.text }}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <div
                    className="w-px h-6 mx-1"
                    style={{ backgroundColor: tokens.color.border }}
                  />
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              {/* PDF Canvas Area */}
              <div
                className="flex-1 overflow-auto border-x border-b rounded-b-2xl p-8 flex justify-center"
                style={{
                  backgroundColor: tokens.color.muted,
                  borderColor: tokens.color.border,
                }}
              >
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                  style={{
                    width: `${zoom}%`,
                    maxWidth: "800px",
                    minHeight: "600px",
                    aspectRatio: "8.5/11",
                  }}
                >
                  <div className="p-8 h-full flex flex-col">
                    <div className="border-b-2 pb-4 mb-6" style={{ borderColor: tokens.color.primary }}>
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
                      >
                        {selectedDoc.name.replace(".pdf", "").replace(/_/g, " ")}
                      </h2>
                      <p className="text-sm mt-1" style={{ color: tokens.color.mutedForeground }}>
                        Uploaded by {selectedDoc.teacher} • {selectedDoc.subject}
                      </p>
                    </div>
                    <div className="flex-1 space-y-4">
                      <p style={{ color: tokens.color.text }}>
                        This is a preview of the document. In a production environment,
                        this area would render the actual PDF content using a PDF viewer
                        library such as react-pdf.
                      </p>
                      <div
                        className="h-4 rounded w-3/4"
                        style={{ backgroundColor: tokens.color.border }}
                      />
                      <div
                        className="h-4 rounded w-full"
                        style={{ backgroundColor: tokens.color.border }}
                      />
                      <div
                        className="h-4 rounded w-5/6"
                        style={{ backgroundColor: tokens.color.border }}
                      />
                      <div
                        className="h-4 rounded w-2/3"
                        style={{ backgroundColor: tokens.color.border }}
                      />
                      <div className="h-8" />
                      <div
                        className="h-4 rounded w-full"
                        style={{ backgroundColor: tokens.color.border }}
                      />
                      <div
                        className="h-4 rounded w-4/5"
                        style={{ backgroundColor: tokens.color.border }}
                      />
                      <div
                        className="h-4 rounded w-3/4"
                        style={{ backgroundColor: tokens.color.border }}
                      />
                    </div>
                    <div className="mt-8 pt-4 border-t text-center" style={{ borderColor: tokens.color.border }}>
                      <p className="text-xs" style={{ color: tokens.color.mutedForeground }}>
                        Page {currentPage} of {selectedDoc.pages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page Navigation */}
              <div
                className="flex items-center justify-center gap-4 py-3 mt-2 rounded-xl"
                style={{ backgroundColor: tokens.color.background }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:opacity-70 disabled:opacity-30 cursor-pointer"
                  style={{ color: tokens.color.text }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium" style={{ color: tokens.color.text }}>
                  Page {currentPage} of {selectedDoc.pages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(selectedDoc.pages, p + 1))
                  }
                  disabled={currentPage === selectedDoc.pages}
                  className="p-2 rounded-lg hover:opacity-70 disabled:opacity-30 cursor-pointer"
                  style={{ color: tokens.color.text }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
