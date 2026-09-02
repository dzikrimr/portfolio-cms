"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const { className = "", ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);
  const ToggleIcon = isVisible ? EyeOff : Eye;

  return (
    <div className="relative">
      <input
        {...rest}
        type={isVisible ? "text" : "password"}
        className={`w-full border border-border rounded-md pl-3 pr-10 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 ${className}`}
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? "Sembunyikan password" : "Tampilkan password"}
        aria-pressed={isVisible}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ToggleIcon className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
