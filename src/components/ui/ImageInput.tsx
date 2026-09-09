"use client";

import { useRef, useState, type InputHTMLAttributes } from "react";
import { ImageUp, LoaderCircle } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

type ImageInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  value: string;
  onValueChange: (url: string) => void;
};

export function ImageInput({ value, onValueChange, className = "", ...rest }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([uploaded]) => {
      if (uploaded) onValueChange(uploaded.ufsUrl);
    },
    onUploadError: (uploadError) => setError(uploadError.message),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    startUpload([file]);
  };

  return (
    <div>
      <div className="relative">
        <input
          {...rest}
          type="url"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          className={`w-full border border-border rounded-md pl-3 pr-10 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 ${className}`}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Upload gambar"
          aria-label="Upload gambar"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <ImageUp className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        tabIndex={-1}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
