import css from "./Home.module.css";

export default function Home() {
  return (
    <div className={css.main}>
      <main>
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
