"use client";
import css from "../../../styles/SignUpPage.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterPayload } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUp = () => {
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
      ) as unknown as RegisterPayload;

      const result = await register(formValues);

      if (result) {
        setUser(result);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>

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
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>

        {isLoading && <div className={css.loader}>Loading...</div>}
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
