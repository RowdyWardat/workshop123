import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { tokens } from "../tokens";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      status: "pending" as const,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      status: "pending" as const,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...selected]);
  };

  const uploadAll = () => {
    setFiles((prev) =>
      prev.map((f) =>
        f.status === "pending" ? { ...f, status: "uploading" as const } : f
      )
    );
    // Simulate upload progress
    files.forEach((file) => {
      if (file.status !== "pending") return;
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, progress: 100, status: "done" as const }
                : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress: Math.round(progress) } : f
            )
          );
        }
      }, 300);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen px-4 py-20" style={{ backgroundColor: tokens.color.muted }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
              Upload Documents
            </h1>
            <p style={{ color: tokens.color.mutedForeground }}>
              Share learning materials with your students. Drag and drop files or browse to select.
            </p>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-200 mb-6"
            style={{
              backgroundColor: isDragging
                ? tokens.color.secondary
                : tokens.color.background,
              borderColor: isDragging
                ? tokens.color.primary
                : tokens.color.border,
            }}
          >
            <UploadCloud
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: tokens.color.primary }}
            />
            <p className="text-lg font-semibold mb-2" style={{ color: tokens.color.text }}>
              {isDragging ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm mb-4" style={{ color: tokens.color.mutedForeground }}>
              or click to browse (PDF, DOC, PPT, up to 100MB)
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
              <span className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl px-6 py-3 text-base border-2 bg-transparent hover:bg-opacity-10 cursor-pointer" style={{ borderColor: tokens.color.primary, color: tokens.color.primary }}>
                Browse Files
              </span>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: tokens.color.text }}>
                  {files.length} file{files.length !== 1 ? "s" : ""} selected
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFiles([])}
                  >
                    Clear All
                  </Button>
                  <Button size="sm" onClick={uploadAll}>
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Upload All
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 rounded-xl border"
                    style={{
                      backgroundColor: tokens.color.background,
                      borderColor: tokens.color.border,
                    }}
                  >
                    <FileText
                      className="w-8 h-8 shrink-0"
                      style={{ color: tokens.color.primary }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: tokens.color.text }}
                      >
                        {file.name}
                      </p>
                      <p className="text-xs" style={{ color: tokens.color.mutedForeground }}>
                        {formatSize(file.size)}
                      </p>
                      {file.status === "uploading" && (
                        <div className="mt-2 w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: tokens.color.border }}>
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${file.progress}%`,
                              backgroundColor: tokens.color.primary,
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="shrink-0">
                      {file.status === "done" && (
                        <CheckCircle
                          className="w-5 h-5"
                          style={{ color: tokens.color.primary }}
                        />
                      )}
                      {file.status === "error" && (
                        <AlertCircle
                          className="w-5 h-5"
                          style={{ color: tokens.color.destructive }}
                        />
                      )}
                      {file.status === "pending" && (
                        <button
                          onClick={() => removeFile(file.id)}
                          className="hover:opacity-70 cursor-pointer"
                        >
                          <X
                            className="w-5 h-5"
                            style={{ color: tokens.color.mutedForeground }}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Recent Uploads */}
          <Card>
            <h3
              className="font-semibold mb-4"
              style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
            >
              Recently Uploaded
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "Biology_Chapter_5.pdf", size: 2400000, date: "2 hours ago" },
                { name: "Math_Problem_Set_3.docx", size: 890000, date: "Yesterday" },
                { name: "History_Timeline.pptx", size: 4100000, date: "3 days ago" },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: tokens.color.muted }}
                >
                  <FileText
                    className="w-8 h-8 shrink-0"
                    style={{ color: tokens.color.primary }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: tokens.color.text }}
                    >
                      {doc.name}
                    </p>
                    <p className="text-xs" style={{ color: tokens.color.mutedForeground }}>
                      {formatSize(doc.size)} • {doc.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
