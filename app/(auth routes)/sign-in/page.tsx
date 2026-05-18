"use client";
import css from "../../../styles/SignInPage.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginPayload } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const LogIn = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setIsLoading(true);

    try {
      const formValues = Object.fromEntries(
        formData
      ) as unknown as LoginPayload;

      const result = await login(formValues);

      if (result) {
        setUser(result);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Something went wrong. Try again later.");
      }
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            disabled={isLoading}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            disabled={isLoading}
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Log in"}
          </button>
        </div>

        {isLoading && <div className={css.loader}>Loading...</div>}

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default LogIn;
