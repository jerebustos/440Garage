"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setIsVideoLoaded(true);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded) return;

    const ctx = gsap.context(() => {
      const video = videoRef.current;
      if (!video) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Smooth scrub
        onUpdate: (self) => {
          if (video.duration) {
            requestAnimationFrame(() => {
              video.currentTime = video.duration * self.progress;
            });
          }
        },
      });

      gsap.to(".hero-text", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "30% top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isVideoLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
          src="/hero-video-scrub.mp4"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0 pointer-events-none"></div>
        <div className="hero-text absolute inset-0 flex flex-col items-center justify-center z-10 text-white pointer-events-none px-6">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-widest text-center max-w-5xl uppercase drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] text-gold mb-6">
            El Sonido Que Te Define
          </h1>
          <p className="mt-4 text-xl md:text-3xl font-light text-slate-200 tracking-wide max-w-3xl text-center">
            Descubre tu próximo instrumento y da el salto hacia una experiencia profesional.
          </p>
        </div>
      </div>
    </div>
  );
}
