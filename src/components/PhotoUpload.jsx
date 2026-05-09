import { useRef } from "react";

export default function PhotoUpload({ photo, onPhotoChange }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Re-render through canvas to strip EXIF (GPS, device info, etc.)
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 1200; // cap size for localStorage
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        const ratio = Math.min(MAX / width, MAX / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      onPhotoChange(canvas.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {photo ? (
        <div className="relative">
          <img
            src={photo}
            alt="Your dish"
            className="w-64 h-64 object-cover rounded-2xl shadow-sm"
          />
          <button
            onClick={() => onPhotoChange(null)}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-400 text-white
                       text-xs flex items-center justify-center shadow cursor-pointer"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-64 h-48 rounded-2xl border-2 border-dashed border-theme
                     flex flex-col items-center justify-center gap-2 text-muted
                     hover:border-primary transition-colors cursor-pointer"
        >
          <span className="text-3xl">📸</span>
          <span className="text-sm font-medium">Add a photo of your dish</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
