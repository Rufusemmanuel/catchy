"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function HeroVideo() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [open, setOpen] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const shouldAttemptModalPlayRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  const closeModal = useCallback(() => {
    shouldAttemptModalPlayRef.current = false;
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onEscape);

    const id = window.requestAnimationFrame(() => {
      if (!modalVideoRef.current || !shouldAttemptModalPlayRef.current) {
        return;
      }

      modalVideoRef.current.muted = false;
      modalVideoRef.current.volume = 1;
      modalVideoRef.current.controls = true;
      void modalVideoRef.current.play().catch(() => {});
      shouldAttemptModalPlayRef.current = false;
    });

    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (open) {
      return;
    }

    if (!prefersReducedMotion && inlineVideoRef.current) {
      void inlineVideoRef.current.play().catch(() => {});
    }
  }, [open, prefersReducedMotion]);

  const openModal = () => {
    shouldAttemptModalPlayRef.current = true;
    inlineVideoRef.current?.pause();
    setOpen(true);
  };

  return (
    <>
      <div className="relative h-full w-full cursor-pointer transition hover:brightness-95" onClick={openModal}>
        <video
          ref={inlineVideoRef}
          className="h-full w-full rounded-xl object-cover object-center"
          autoPlay={!prefersReducedMotion}
          muted
          loop={!prefersReducedMotion}
          playsInline
          preload="metadata"
          controls={false}
          poster="/placeholders/video-poster.svg"
          aria-label="Catchy hero featured service video"
        >
          <source src="/videos/catchy-hero.webm" type="video/webm" />
          <source src="/videos/catchy-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Featured service video viewer"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeModal();
                }
              }}
            >
              <div className="relative w-[95vw] max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  aria-label="Close video"
                  className="absolute top-3 right-3 z-10 rounded-full bg-black/50 p-2 text-white ring-1 ring-white/40 transition hover:bg-black/65"
                  onClick={closeModal}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4l-4.9-4.9 4.9-4.9a1 1 0 0 0 0-1.4Z"
                    />
                  </svg>
                </button>
                <div className="h-full w-full flex items-center justify-center bg-black">
                  <video
                    ref={modalVideoRef}
                    className="w-full h-full object-contain"
                    style={{ maxWidth: "95vw", maxHeight: "85vh" }}
                    playsInline
                    preload="metadata"
                    controls
                  >
                    <source src="/videos/catchy-hero.webm" type="video/webm" />
                    <source src="/videos/catchy-hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
