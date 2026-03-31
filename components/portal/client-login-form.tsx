"use client";

import { useActionState } from "react";
import { loginClientPortal, type LoginState } from "@/app/client-login/actions";

const initialState: LoginState = {};

export function ClientLoginForm() {
  const [state, formAction, isPending] = useActionState(loginClientPortal, initialState);

  return (
    <form action={formAction} className="rounded-[2rem] border border-line bg-white p-8 shadow-card">
      <p className="text-xs uppercase tracking-[0.32em] text-muted">Client Login</p>
      <h2 className="mt-4 font-display text-4xl text-navy">Open your portal</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
        Enter the email and access code provided to you to view your transaction timeline.
      </p>

      <div className="mt-8 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-navy">Email</span>
          <input
            type="email"
            name="email"
            className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy"
            placeholder="name@example.com"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-navy">Access Code</span>
          <input
            type="text"
            name="accessCode"
            className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy"
            placeholder="Provided by Robert"
          />
        </label>
      </div>

      {state.error ? (
        <p className="mt-5 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-8 inline-flex items-center rounded-full bg-navy px-6 py-3 text-sm text-white transition hover:bg-[#1a2c47] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Opening..." : "Open Portal"}
      </button>
    </form>
  );
}
