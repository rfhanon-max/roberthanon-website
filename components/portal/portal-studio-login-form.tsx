"use client";

import { useActionState } from "react";
import {
  loginPortalStudio,
  type PortalStudioLoginState,
} from "@/app/portal-studio/login/actions";

const initialState: PortalStudioLoginState = {};

export function PortalStudioLoginForm() {
  const [state, formAction, isPending] = useActionState(loginPortalStudio, initialState);

  return (
    <form action={formAction} className="rounded-[2rem] border border-line bg-white p-8 shadow-card">
      <p className="text-xs uppercase tracking-[0.32em] text-muted">Portal Studio</p>
      <h2 className="mt-4 font-display text-4xl text-navy">Admin login</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
        Enter the studio password to manage client portals and update contingency status.
      </p>

      <label className="mt-8 grid gap-2">
        <span className="text-sm font-medium text-navy">Password</span>
        <input
          type="password"
          name="password"
          className="rounded-[1.2rem] border border-line bg-paper px-4 py-3 text-base text-navy outline-none transition focus:border-navy"
        />
      </label>

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
        {isPending ? "Opening..." : "Open Portal Studio"}
      </button>
    </form>
  );
}
