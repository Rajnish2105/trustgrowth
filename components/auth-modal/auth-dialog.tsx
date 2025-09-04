"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [formHeight, setFormHeight] = useState<number>(400);
  const [showBlueBackground, setShowBlueBackground] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Form state for credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleModeSwitch() {
    setIsTransitioning(true);

    if (isSignUp) {
      // When switching from sign-up to sign-in: retreat background immediately
      setShowBlueBackground(false);
      // Start height transition
      setTimeout(() => {
        setFormHeight(400);
      }, 100);
    } else {
      // When switching from sign-in to sign-up: expand background first
      setShowBlueBackground(true);
      // Start height transition
      setTimeout(() => {
        setFormHeight(480);
      }, 100);
    }

    // Switch form mode after background animation
    setTimeout(() => {
      setIsSignUp((prev) => !prev);
      setIsTransitioning(false);
    }, 500);
  }

  // Update states when isSignUp changes (for initial state)
  useEffect(() => {
    if (!isTransitioning) {
      setFormHeight(isSignUp ? 480 : 400);
      setShowBlueBackground(isSignUp);
    }
  }, [isSignUp, isTransitioning]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) setError("Invalid credentials");
    else onClose();
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setSignUpError("");
    setFieldErrors({ name: "", email: "", password: "" });

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      await signIn("credentials", { email, password, redirect: false });
      onClose();
    } else {
      const errorData = await res.json();
      if (errorData.fieldErrors) {
        setFieldErrors(errorData.fieldErrors);
      } else {
        setSignUpError("Registration failed");
      }
    }
  }

  const updateFieldError = (field: string, message: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  };

  const dialogJSX = (
    <>
      {isOpen && (
        <dialog
          open={isOpen}
          className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-transparent animate-in fade-in duration-200"
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          />

          {/* Dialog Content */}
          <div className="relative w-full max-w-md mx-4 bg-gradient-to-b from-blue-300 to-sky-300 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 ease-out overflow-hidden border border-green-100">
            {/* Expanding Background Animation */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-emerald-400 via-green-400 to-teal-400 origin-bottom transition-transform duration-500 ease-in-out ${
                showBlueBackground
                  ? "scale-y-100"
                  : "scale-y-0 translate-y-full"
              }`}
              style={{
                transformOrigin: "bottom",
              }}
            />

            {/* Header with Close Button */}
            <div className="relative z-10 flex justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/20 rounded-full transition-colors duration-200 bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div
              className="relative z-10 px-8 pb-8 flex flex-col transition-all duration-500 ease-in-out"
              style={{ minHeight: `${formHeight}px` }}
            >
              {/* Title */}
              <div className="text-center mb-8">
                <h1
                  className={`text-2xl font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700 bg-clip-text text-transparent transition-opacity duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Trust Growth
                </h1>
              </div>

              {/* Form Fields Container */}
              <div className="flex-1 flex flex-col justify-center transition-all duration-500 ease-in-out">
                {isTransitioning ? (
                  /* Transition State - Loading skeleton */
                  <div className="space-y-4 opacity-0 transition-opacity duration-150">
                    <div className="h-12 bg-white/30 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-white/30 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-white/30 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-white/30 rounded-lg animate-pulse"></div>
                  </div>
                ) : !isSignUp ? (
                  /* Sign In Form */
                  <form
                    className="space-y-4 animate-in fade-in duration-400 delay-0"
                    onSubmit={handleSignIn}
                  >
                    {/* Email Field */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email..."
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {/* Password Field */}
                    <div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password..."
                          className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Error Message */}
                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}
                    {/* Sign In Button */}
                    <div>
                      <button className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 font-medium shadow-sm">
                        Sign In &#8594;
                      </button>
                    </div>
                    {/* Divider */}
                    <div className="my-6">
                      <hr className="border-green-200" />
                    </div>
                    {/* Google Sign In Button */}
                    <div>
                      <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium rounded-lg shadow-md flex items-center justify-center space-x-2"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.344 10.276a9.555 9.555 0 0 0-.223-1.782h-9.01v3.585h5.038a4.298 4.298 0 0 1-1.785 2.802v2.338h3.016a9.544 9.544 0 0 0 2.764-7.013z"
                            fill="#4285F4"
                          />
                          <path
                            d="M9.99 19.346c2.72 0 5.006-.898 6.674-2.44l-3.016-2.338a5.986 5.986 0 0 1-3.658.946c-2.825 0-5.213-1.902-6.075-4.437H.813v2.404A9.55 9.55 0 0 0 9.99 19.346z"
                            fill="#34A853"
                          />
                          <path
                            d="M3.915 11.233a6.002 6.002 0 0 1 0-2.476v-2.404H.813a9.55 9.55 0 0 0 0 7.284L3.915 11.233z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M9.99 3.01c1.472 0 2.793.504 3.834 1.493l2.673-2.673C15.006.88 12.72 0 9.99 0A9.55 9.55 0 0 0 .813 3.917l3.102 2.404C4.777 4.912 7.165 3.01 9.99 3.01z"
                            fill="#EA4335"
                          />
                        </svg>
                        <span>Google Sign in</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Sign Up Form */
                  <form
                    className="space-y-4 animate-in fade-in duration-400 delay-0"
                    onSubmit={handleSignUp}
                  >
                    {/* Name Field */}
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      {fieldErrors.name && (
                        <div className="text-red-600 text-sm mt-1 px-1">
                          {fieldErrors.name}
                        </div>
                      )}
                    </div>
                    {/* Email Field */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email..."
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {fieldErrors.email && (
                        <div className="text-red-600 text-sm mt-1 px-1">
                          {fieldErrors.email}
                        </div>
                      )}
                    </div>
                    {/* Password Field */}
                    <div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password..."
                          className="w-full px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {fieldErrors.password && (
                        <div className="text-red-600 text-sm mt-1 px-1">
                          {fieldErrors.password}
                        </div>
                      )}
                    </div>
                    {/* Error Message */}
                    {signUpError && (
                      <div className="text-red-600 text-sm">{signUpError}</div>
                    )}
                    {/* Create Account Button */}
                    <div>
                      <button className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 font-medium shadow-sm">
                        Create Account
                      </button>
                    </div>
                    {/* Divider */}
                    <div className="my-6">
                      <hr className="border-green-200" />
                    </div>
                    {/* Google Sign Up Button */}
                    <div>
                      <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium rounded-lg shadow-md flex items-center justify-center space-x-2"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-3"
                        >
                          <path
                            d="M19.344 10.276a9.555 9.555 0 0 0-.223-1.782h-9.01v3.585h5.038a4.298 4.298 0 0 1-1.785 2.802v2.338h3.016a9.544 9.544 0 0 0 2.764-7.013z"
                            fill="#4285F4"
                          />
                          <path
                            d="M9.99 19.346c2.72 0 5.006-.898 6.674-2.44l-3.016-2.338a5.986 5.986 0 0 1-3.658.946c-2.825 0-5.213-1.902-6.075-4.437H.813v2.404A9.55 9.55 0 0 0 9.99 19.346z"
                            fill="#34A853"
                          />
                          <path
                            d="M3.915 11.233a6.002 6.002 0 0 1 0-2.476v-2.404H.813a9.55 9.55 0 0 0 0 7.284L3.915 11.233z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M9.99 3.01c1.472 0 2.793.504 3.834 1.493l2.673-2.673C15.006.88 12.72 0 9.99 0A9.55 9.55 0 0 0 .813 3.917l3.102 2.404C4.777 4.912 7.165 3.01 9.99 3.01z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google Sign up
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Bottom Toggle Button */}
            <div
              onClick={handleModeSwitch}
              className={`relative z-10 p-4 w-full border border-green-200 rounded-lg cursor-pointer transition-all duration-500 ${
                isTransitioning ? "opacity-50" : "opacity-100 hover:opacity-90"
              } ${
                isSignUp
                  ? "bg-gradient-to-b from-blue-300 to-sky-300 text-emerald-700 hover:from-sky-400 hover:to-green-500"
                  : "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 text-white hover:from-emerald-500 hover:via-green-500 hover:to-teal-500"
              }`}
              style={{
                borderRadius: "0 0 1rem 1rem",
              }}
            >
              <div className="text-center">
                <span className="font-semibold">
                  {isSignUp ? "Sign in" : "Sign up"}
                </span>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );

  if (!mounted) return null;
  return isOpen ? createPortal(dialogJSX, document.body) : null;
}
