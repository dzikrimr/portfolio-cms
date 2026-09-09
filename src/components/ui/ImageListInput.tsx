"use client";

import { useRef, useState, type TextareaHTMLAttributes } from "react";
import { ImageUp, LoaderCircle } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

const MAX_UPLOAD_COUNT = 5;

type ImageListInputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange"
> & {
  value: string;
  onValueChange: (value: string) => void;
};

/** Appends uploads as extra lines so existing URLs are never overwritten. */
export function ImageListInput({ value, onValueChange, className = "", ...rest }: ImageListInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (uploaded) => {
      const urls = uploaded.map((file) => file.ufsUrl);
      const existing = value.trim();
      onValueChange(existing ? `${existing}\n${urls.join("\n")}` : urls.join("\n"));
    },
    onUploadError: (uploadError) => setError(uploadError.message),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    setError("");
    startUpload(files.slice(0, MAX_UPLOAD_COUNT));
  };

  return (
    <div>
      <div className="relative">
        <textarea
          {...rest}
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
          className="absolute top-2 right-2 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
        multiple
        onChange={handleFileChange}
        className="hidden"
        tabIndex={-1}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
