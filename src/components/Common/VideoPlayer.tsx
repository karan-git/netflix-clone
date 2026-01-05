"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Settings,
  Subtitles,
  X,
} from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  url: string;
  title?: string;
  subtitleUrl?: string;
  onClose: () => void;
  movieId: string | number;
}

export function VideoPlayer({
  url,
  title,
  subtitleUrl,
  onClose,
  movieId,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Resume playback
        const savedTime = localStorage.getItem(`video-resume-${movieId}`);
        if (savedTime) {
          video.currentTime = parseFloat(savedTime);
        }
        video.play().catch(() => setIsPlaying(false));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        const savedTime = localStorage.getItem(`video-resume-${movieId}`);
        if (savedTime) {
          video.currentTime = parseFloat(savedTime);
        }
        video.play().catch(() => setIsPlaying(false));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url, movieId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
      // Save progress
      localStorage.setItem(
        `video-resume-${movieId}`,
        video.currentTime.toString()
      );
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [movieId]);

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (time: number) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor(time % 60);
    return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center group select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        onClick={togglePlay}
        playsInline
      >
        {subtitleUrl && (
          <track
            kind="subtitles"
            src={subtitleUrl}
            srcLang="en"
            label="English"
            default={showSubtitles}
          />
        )}
      </video>

      {/* TOP BAR */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 p-4 sm:p-8 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="custom"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white border-none shadow-none"
          >
            <X size={28} />
          </Button>
          <h2 className="text-white text-lg sm:text-xl font-medium">{title}</h2>
        </div>
      </div>

      {/* CENTER PLAY/PAUSE (Mobile) */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={togglePlay}
          className="p-6 bg-black/40 rounded-full text-white pointer-events-auto hover:bg-black/60 transition-transform active:scale-90"
        >
          {isPlaying ? (
            <Pause size={48} fill="currentColor" />
          ) : (
            <Play size={48} fill="currentColor" />
          )}
        </button>
      </div>

      {/* BOTTOM CONTROLS */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 sm:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Progress Bar */}
        <div className="relative w-full h-1.5 bg-white/30 rounded-full mb-6 group/progress cursor-pointer">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={togglePlay}
              className="text-white hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <Pause size={28} fill="currentColor" />
              ) : (
                <Play size={28} fill="currentColor" />
              )}
            </button>

            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="text-white">
                {isMuted || volume === 0 ? (
                  <VolumeX size={28} />
                ) : (
                  <Volume2 size={28} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-24 transition-all duration-300 accent-red-600 cursor-pointer"
              />
            </div>

            <span className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={cn(
                "text-white transition-colors",
                showSubtitles ? "text-red-600" : "text-white/60"
              )}
            >
              <Subtitles size={28} />
            </button>
            <button className="text-white hover:rotate-90 transition-transform">
              <Settings size={28} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="text-white hover:scale-110 transition-transform"
            >
              <Maximize size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
