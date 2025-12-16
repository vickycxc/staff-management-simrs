// src/components/GlobalStyles.jsx
import { useEffect } from "react";

export default function GlobalStyles() {
  useEffect(() => {
    document.body.classList.add("bg-white", "dark:bg-gray-900");
  }, []);

  return null;
}
