import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigation
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log("Admin Login:", { username, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 p-4">
      <div className="w-full max-w-sm">


        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-slate-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-slate-700">Admin Portal</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to continue</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-0 focus:bg-white focus:ring-2 focus:ring-blue-400/40 transition-all placeholder-slate-400 text-slate-700"
              placeholder="Username"
              required
            />
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-0 focus:bg-white focus:ring-2 focus:ring-blue-400/40 transition-all placeholder-slate-400 text-slate-700"
              placeholder="Password"
              required
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-slate-600 text-white py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-slate-700 disabled:opacity-60 transition-all shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
              Forgot password?
            </button>
            
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-3">Create admin account with Gmail</p>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-600 text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Gmail
              </button>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Main Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}