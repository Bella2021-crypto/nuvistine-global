"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create account.");
        return;
      }

      window.location.href = "/account";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-16 text-[var(--foreground)]">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="font-serif text-3xl tracking-[0.12em] transition hover:text-[#A98216]"
          >
            NUVISTINE
          </Link>

          <p className="mt-3 text-xs tracking-[0.3em] text-[#A98216]">
            CREATE YOUR ACCOUNT
          </p>
        </div>

        <div className="border border-[var(--card-border)] bg-[var(--card)] p-8 sm:p-10">
          <h1 className="font-serif text-3xl">Create an account</h1>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Join Nuvistine to manage your orders and enjoy a seamless shopping
            experience.
          </p>

          {error && (
            <div className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs tracking-[0.12em]"
              >
                FULL NAME
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
                className="w-full border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs tracking-[0.12em]"
              >
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="w-full border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs tracking-[0.12em]"
              >
                PASSWORD
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[#C9A227]"
              />

              <p className="mt-2 text-xs text-[var(--muted)]">
                Password must be at least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--foreground)] px-6 py-4 text-xs tracking-[0.2em] text-[var(--background)] transition hover:bg-[#C9A227] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-8 border-t border-[var(--card-border)] pt-6 text-center text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#A98216] transition hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}