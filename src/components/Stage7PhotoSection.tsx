import { useState, useRef } from 'react';
import {
  Heart,
  Sparkles,
  Upload,
  Play,
  Pause,
  ArrowRight,
  RotateCw,
  ZoomIn,
  ZoomOut,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Trash2,
} from 'lucide-react';
import { PhotoItem } from '../types';
import { audioManager } from '../utils/audio';

interface Stage7PhotoSectionProps {
  onComplete: () => void;
}

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    caption: 'That gorgeous smile that lights up the world ✨',
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    caption: 'Those cute dimples and enchanting eyes 💕',
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    caption: 'Pure warmth, friendship, and endless laughs 🌸',
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=80',
    caption: 'A friend who became family forever ❤️',
  },
];

export default function Stage7PhotoSection({ onComplete }: Stage7PhotoSectionProps) {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Edit / Adjust Modal State
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);
  const [editZoom, setEditZoom] = useState<number>(1);
  const [editRotation, setEditRotation] = useState<number>(0);
  const [editCaption, setEditCaption] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    audioManager.playSparkle();
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto: PhotoItem = {
            id: `custom-${Date.now()}-${Math.random()}`,
            url: event.target.result as string,
            caption: 'Sweetest memory with Arfa 💖',
            isCustom: true,
          };
          setPhotos((prev) => [newPhoto, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = '';
  };

  // Open adjuster for a photo
  const openAdjustModal = (photo: PhotoItem) => {
    setEditingPhoto(photo);
    setEditCaption(photo.caption);
    setEditZoom(1);
    setEditRotation(0);
  };

  const savePhotoAdjustment = () => {
    if (!editingPhoto) return;
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === editingPhoto.id ? { ...p, caption: editCaption } : p
      )
    );
    setEditingPhoto(null);
    audioManager.playSparkle();
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Slideshow Controls
  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section
      id="stage-photo-gallery"
      aria-label="Photo Gallery for Arfa"
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8"
    >
      <header className="relative z-10 mb-6 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/50 border border-rose-400/30 text-rose-200 text-xs font-medium backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Moments & Memories</span>
        </div>
        <h1
          id="gallery-heading"
          className="font-romantic text-3xl sm:text-4xl text-rose-100 font-bold drop-shadow-md"
        >
          Cherished Memories of Arfa 📸
        </h1>
        <p className="text-rose-200/80 text-xs sm:text-sm max-w-md mx-auto">
          Every picture holds a thousand smiles. You can also add your own photos!
        </p>
      </header>

      {/* Action Toolbar */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-6">
        <button
          id="btn-upload-photo"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 rounded-full bg-rose-500/30 hover:bg-rose-500/40 border border-rose-400/40 text-rose-100 text-xs font-medium shadow-md transition flex items-center gap-2 cursor-pointer min-h-[44px]"
        >
          <Upload className="w-4 h-4 text-rose-300" />
          <span>Add Photos of Arfa 📷</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />

        <button
          id="btn-toggle-slideshow"
          type="button"
          onClick={() => {
            setIsSlideshow(!isSlideshow);
            audioManager.playSparkle();
          }}
          className={`px-4 py-2.5 rounded-full border text-xs font-medium shadow-md transition flex items-center gap-2 cursor-pointer min-h-[44px] ${
            isSlideshow
              ? 'bg-amber-400/30 border-amber-300/50 text-amber-100'
              : 'bg-rose-900/40 border-rose-400/30 text-rose-200 hover:bg-rose-800/50'
          }`}
        >
          {isSlideshow ? (
            <>
              <Pause className="w-4 h-4 text-amber-300" />
              <span>Exit Slideshow</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-rose-300 fill-rose-300" />
              <span>Slideshow Mode 🎞️</span>
            </>
          )}
        </button>
      </div>

      {/* GALLERY DISPLAY */}
      {!isSlideshow ? (
        /* Grid Mode: Polaroid / Romantic Card Style */
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-2">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className="group relative bg-white/95 text-stone-800 rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col border border-rose-200/60"
            >
              {/* Polaroid Top Tape Accent */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-5 bg-amber-100/70 border border-amber-200/50 backdrop-blur-xs rotate-1 rounded-sm shadow-xs" />

              {/* Photo Image with Heart Sticker */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-rose-50 mb-3 border border-rose-100">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-rose-950/60 backdrop-blur-xs text-rose-300">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                </div>
              </div>

              {/* Caption */}
              <div className="flex-1 flex flex-col justify-between">
                <p className="font-handwriting text-base text-stone-700 leading-snug line-clamp-2 px-1">
                  {photo.caption}
                </p>

                {/* Adjust / Edit buttons */}
                <div className="mt-2 pt-2 border-t border-rose-100/70 flex items-center justify-between text-xs text-stone-400">
                  <button
                    type="button"
                    onClick={() => openAdjustModal(photo)}
                    className="flex items-center gap-1 hover:text-rose-600 cursor-pointer min-h-[36px]"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Adjust</span>
                  </button>

                  {photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="hover:text-red-500 cursor-pointer p-1 min-h-[36px] flex items-center"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Slideshow View */
        <div className="w-full max-w-md my-2 flex flex-col items-center">
          <div className="relative w-full aspect-4/5 sm:aspect-square bg-white rounded-3xl p-4 shadow-2xl border border-rose-300/50 flex flex-col items-center justify-between">
            {/* Main Slide Image */}
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-rose-50 shadow-inner">
              <img
                src={photos[currentSlideIndex].url}
                alt={photos[currentSlideIndex].caption}
                className="w-full h-full object-cover animate-fadeIn"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-rose-950/70 backdrop-blur-md text-white text-xs font-mono">
                {currentSlideIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Caption */}
            <p className="font-handwriting text-xl text-stone-800 mt-3 text-center px-2">
              {photos[currentSlideIndex].caption}
            </p>

            {/* Slide Navigation Buttons */}
            <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-rose-100">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5">
                {photos.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlideIndex ? 'w-5 bg-rose-500' : 'bg-rose-200'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / ADJUST MODAL */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-stone-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-semibold text-lg text-rose-900">Adjust Photo</h3>
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview with Rotation and Zoom */}
            <div className="w-full h-48 rounded-2xl overflow-hidden bg-stone-100 flex items-center justify-center relative border border-stone-200">
              <img
                src={editingPhoto.url}
                alt="Editing preview"
                className="w-full h-full object-cover transition-all"
                style={{
                  transform: `scale(${editZoom}) rotate(${editRotation}deg)`,
                }}
              />
            </div>

            {/* Controls: Zoom & Rotate */}
            <div className="flex items-center justify-around py-1">
              <button
                type="button"
                onClick={() => setEditZoom((z) => Math.max(0.8, z - 0.1))}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 min-h-[40px]"
              >
                <ZoomOut className="w-4 h-4" />
                <span>Zoom -</span>
              </button>

              <button
                type="button"
                onClick={() => setEditRotation((r) => (r + 90) % 360)}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 min-h-[40px]"
              >
                <RotateCw className="w-4 h-4" />
                <span>Rotate</span>
              </button>

              <button
                type="button"
                onClick={() => setEditZoom((z) => Math.min(2, z + 0.1))}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 min-h-[40px]"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom +</span>
              </button>
            </div>

            {/* Caption Input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-600">Caption for Arfa</label>
              <input
                type="text"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder="Write a sweet memory line..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePhotoAdjustment}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-md min-h-[44px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Button to Next Stage: Gift Box */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
        <button
          id="btn-proceed-gift"
          type="button"
          onClick={() => {
            audioManager.playSparkle();
            onComplete();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-semibold text-base shadow-lg shadow-rose-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
        >
          <span>Open Your Birthday Gift 🎁</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
