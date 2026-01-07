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
import { movieService } from "@/services/movieService";
import { Subtitle } from "@/types/movie";
import { SubtitleMenu } from "./SubtitleMenu";

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
  const [selectedSubtitleId, setSelectedSubtitleId] = useState<string | null>(
    null
  );
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch (e) {
      return url;
    }
  };

  const processSubtitleContent = (text: string, isSrt: boolean) => {
    let vttText = isSrt ? "WEBVTT\n\n" : "";

    if (isSrt) {
      vttText += text.replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2"); // Replace commas with dots
    } else {
      vttText += text;
    }

    // Lift subtitles by adding line:85% to timestamps
    vttText = vttText
      .replace(
        /(\d\d:\d\d:\d\d\.\d\d\d\s*-->\s*\d\d:\d\d:\d\d\.\d\d\d)/g,
        "$1 line:85%"
      )
      .replace(/\r/g, ""); // Remove carriage returns

    return vttText;
  };

  useEffect(() => {
    if (isYoutube) return;

    const fetchSubtitles = async () => {
      try {
        console.log("VideoPlayer: Fetching subtitles for movieId:", movieId);
        const response = await movieService.getSubtitles(movieId);
        console.log("VideoPlayer: Subtitles response:", response);
        if (response.status) {
          const processedSubtitles = await Promise.all(
            response.subtitles.map(async (sub) => {
              const isSrt = sub.file.endsWith(".srt");
              const isVtt = sub.file.endsWith(".vtt");

              if (isSrt || isVtt) {
                try {
                  const proxyUrl = `/api/subtitle-proxy?url=${encodeURIComponent(
                    sub.file
                  )}`;
                  console.log(
                    `VideoPlayer: Fetching ${isSrt ? "SRT" : "VTT"} via proxy:`,
                    proxyUrl
                  );
                  const res = await fetch(proxyUrl);
                  if (!res.ok)
                    throw new Error(`Proxy fetch failed: ${res.statusText}`);
                  const text = await res.text();
                  console.log(
                    `VideoPlayer: ${
                      isSrt ? "SRT" : "VTT"
                    } text fetched successfully`
                  );

                  const vttText = processSubtitleContent(text, isSrt);
                  const blob = new Blob([vttText], { type: "text/vtt" });
                  return {
                    ...sub,
                    file: URL.createObjectURL(blob),
                    isConverted: true,
                  };
                } catch (e) {
                  console.error(
                    `VideoPlayer: Error processing ${isSrt ? "SRT" : "VTT"}:`,
                    e
                  );
                  return sub;
                }
              }
              return sub;
            })
          );
          setSubtitles(processedSubtitles);

          // Set default subtitle if available
          const defaultSub = processedSubtitles.find((s) => s.isDefault);
          if (defaultSub) {
            setSelectedSubtitleId(defaultSub._id);
          } else if (processedSubtitles.length > 0) {
            // Optional: Select first available if no default?
            // For now, let's stick to explicit default or off.
            setSelectedSubtitleId(processedSubtitles[0]._id);
          }
        }
      } catch (error) {
        console.error("VideoPlayer: Error fetching subtitles:", error);
      }
    };

    fetchSubtitles();
  }, [movieId, isYoutube]);

  useEffect(() => {
    return () => {
      // Cleanup Blob URLs
      subtitles.forEach((sub: any) => {
        if (sub.isConverted && sub.file.startsWith("blob:")) {
          URL.revokeObjectURL(sub.file);
        }
      });
    };
  }, [subtitles]);

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
      const duration = video.duration;
      if (duration > 0) {
        setProgress((video.currentTime / duration) * 100);
      } else {
        setProgress(0);
      }
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tracks = video.textTracks;
    // Hide all tracks first
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = "hidden";
    }

    // Enable the selected track
    if (selectedSubtitleId) {
      const selectedSub = subtitles.find((s) => s._id === selectedSubtitleId);
      if (selectedSub) {
        // Find the track index that corresponds to this subtitle
        // Note: The order of tracks in video.textTracks matches the order of <track> elements
        const trackIndex = subtitles.findIndex(
          (s) => s._id === selectedSubtitleId
        );
        if (trackIndex !== -1 && trackIndex < tracks.length) {
          tracks[trackIndex].mode = "showing";
        }
      }
    }
  }, [selectedSubtitleId, subtitles]);

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
      if (isPlaying && !showSubtitleMenu) setShowControls(false);
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

  const handleSubtitleSelect = (id: string | null) => {
    setSelectedSubtitleId(id);
    setShowSubtitleMenu(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center group select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() =>
        isPlaying && !showSubtitleMenu && setShowControls(false)
      }
    >
      {isYoutube ? (
        <iframe
          src={getYouTubeEmbedUrl(url)}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full"
          onClick={togglePlay}
          playsInline
          crossOrigin="anonymous"
        >
          {subtitles.map((sub) => (
            <track
              key={sub._id}
              kind="subtitles"
              src={sub.file}
              srcLang={sub.language.uniqueId.toLowerCase()}
              label={sub.language.name}
              default={sub._id === selectedSubtitleId}
            />
          ))}
          {/* Fallback for single subtitleUrl prop if needed, though we primarily use the subtitles array now */}
          {subtitleUrl && !subtitles.find((s) => s.file === subtitleUrl) && (
            <track
              kind="subtitles"
              src={subtitleUrl}
              srcLang="en"
              label="English"
            />
          )}
        </video>
      )}

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
      {!isYoutube && showControls && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
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
      )}

      {/* BOTTOM CONTROLS */}
      {!isYoutube && (
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
              value={isNaN(progress) ? 0 : progress}
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

            <div className="flex items-center gap-4 sm:gap-6 relative">
              {showSubtitleMenu && (
                <SubtitleMenu
                  subtitles={subtitles}
                  selectedSubtitleId={selectedSubtitleId}
                  onSelect={handleSubtitleSelect}
                  onClose={() => setShowSubtitleMenu(false)}
                />
              )}
              <button
                onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}
                className={cn(
                  "text-white transition-colors",
                  selectedSubtitleId ? "text-red-600" : "text-white/60"
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
      )}
    </div>
  );
}
