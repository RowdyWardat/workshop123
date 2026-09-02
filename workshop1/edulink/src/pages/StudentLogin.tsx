import { useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "../tokens";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { GraduationCap, UserPlus, LogIn, ArrowLeft } from "lucide-react";

export default function StudentLogin() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ backgroundColor: tokens.color.muted }}>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: tokens.color.primary }}
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
            >
              Student Portal
            </h1>
            <p style={{ color: tokens.color.mutedForeground }}>
              {mode === "login" ? "Welcome back! Sign in to access your materials." : "Create your student account to get started."}
            </p>
          </div>

          <Card>
            {success ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: tokens.color.primary }}
                >
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: tokens.color.text }}>
                  {mode === "login" ? "Welcome Back!" : "Account Created!"}
                </h2>
                <p className="mb-6" style={{ color: tokens.color.mutedForeground }}>
                  {mode === "login"
                    ? "You have been successfully signed in."
                    : "Your student account has been created. You can now sign in."}
                </p>
                <Button onClick={() => { setSuccess(false); setMode("login"); }}>
                  Go to Dashboard
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === "register" && (
                  <Input label="Full Name" placeholder="Jane Doe" required />
                )}
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="student@school.edu"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                {mode === "register" && (
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                )}
                {mode === "login" && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm hover:underline cursor-pointer"
                      style={{ color: tokens.color.primary }}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
                <Button type="submit" isLoading={isLoading} className="w-full">
                  {mode === "login" ? (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            )}

            {!success && (
              <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: tokens.color.border }}>
                <p className="text-sm" style={{ color: tokens.color.mutedForeground }}>
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="font-semibold hover:underline cursor-pointer"
                    style={{ color: tokens.color.primary }}
                  >
                    {mode === "login" ? "Register" : "Sign In"}
                  </button>
                </p>
              </div>
            )}
          </Card>

          <div className="mt-6 text-center">
            <button
              onClick={() => { window.location.href = "/"; }}
              className="inline-flex items-center gap-2 text-sm hover:opacity-70 cursor-pointer"
              style={{ color: tokens.color.mutedForeground }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
