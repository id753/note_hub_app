"use client";

import { useEffect, useState } from "react";
import css from "./Home.module.css";

export default function Home() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("render_notice_seen");

    if (!seen) {
      setShowNotice(true);
    }
  }, []);

  const closeNotice = () => {
    setShowNotice(false);
    localStorage.setItem("render_notice_seen", "true");
  };

  return (
    <div className={css.main}>
      <main>
        {showNotice && (
          <div className={css.notice}>
            <p>
              ⚠️ First load may take 30–50 seconds because the server can go
              idle on Render’s free plan.
            </p>

            <button onClick={closeNotice}>OK</button>
          </div>
        )}

        <div className={css.hero}>
          <h1 className={css.title}>Welcome to NoteHub</h1>

          <p className={css.subtitle}>
            NoteHub is a fast and simple space for your notes. Capture ideas,
            organize thoughts, and find anything in seconds — without clutter or
            distractions.
          </p>

          <p className={css.subtitle}>
            Whether it’s daily tasks, random ideas, or important info,
            everything stays neatly structured and always within reach.
          </p>
        </div>
      </main>
    </div>
  );
}
