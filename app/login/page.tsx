"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to log in.");
        return;
      }

      localStorage.setItem(
        "nuvistine-customer",
        JSON.stringify(data.customer),
      );

      window.location.href = "/account";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F3E7] px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-[#A98216]">
            NUVISTINE GLOBAL
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#201C17]">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm text-[#6B6258]">
            Sign in to access your Nuvistine account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 border border-[#D8CDB9] bg-white p-8"
        >
          {error && (
            <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="text-xs tracking-widest text-[#201C17]"
            >
              EMAIL
            </label>

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full border border-[#D8CDB9] bg-[#F8F3E7] px-4 py-3 text-sm outline-none focus:border-[#A98216]"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="password"
              className="text-xs tracking-widest text-[#201C17]"
            >
              PASSWORD
            </label>

            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full border border-[#D8CDB9] bg-[#F8F3E7] px-4 py-3 text-sm outline-none focus:border-[#A98216]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-[#201C17] px-6 py-4 text-xs tracking-[0.2em] text-white transition hover:bg-[#A98216] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

          <p className="mt-6 text-center text-sm text-[#6B6258]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#A98216] hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/shop"
            className="text-xs tracking-widest text-[#6B6258] hover:text-[#A98216]"
          >
            ← CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </main>
  );
}