"use client";

import { useEffect, useState } from "react";
import css from "./AvatarPicker.module.css";
import Image from "next/image";

type Props = {
  profilePhotoUrl?: string;
  onChangePhoto: (file: File | null) => void;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (profilePhotoUrl) {
      setPreviewUrl(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only images");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }
      onChangePhoto(file); // передаємо файл у батьківський компонент
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemove = () => {
    onChangePhoto(null); // очищуємо батьківський стан
    setPreviewUrl("");
  };

  return (
    <div>
      <div className={css.picker}>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}
        <label
          className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}
        >
          Choose avatar - Max size 5MB
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={css.input}
          />
        </label>
        {previewUrl && (
          <button className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
