// app/notes/@modal/(.)notes/[id]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";

export default function NoteModalPage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreviewClient />
    </Modal>
  );
}
