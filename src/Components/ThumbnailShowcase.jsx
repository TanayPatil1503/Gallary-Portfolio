import React, { useState, useEffect } from 'react';
import { X, Play, Eye, Heart, Share2 } from 'lucide-react';
import BackgroundIMG from '../assets/ExampleIMG.jpg';

const ThumbnailShowcase = () => {
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [visibleItems, setVisibleItems] = useState(new Set());

    // Sample thumbnail data - replace with your actual thumbnails
    const thumbnails = [
        {
            id: 1,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 2,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 3,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 4,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 5,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 6,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 7,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 8,
            title: "Example Image",
            image: BackgroundIMG,
        },
        {
            id: 9,
            title: "Example Image",
            image: BackgroundIMG,
        }
    ];

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => new Set(prev).add(entry.target.dataset.id));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const openFullscreen = (thumbnail) => {
        setSelectedThumbnail(thumbnail);
        document.body.style.overflow = 'hidden';
    };

    const closeFullscreen = () => {
        setSelectedThumbnail(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pt-20 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 tracking-tight animate-fade-in">
                        THUMBNAIL
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SHOWCASE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
                        Discover eye-catching YouTube thumbnail designs that drive clicks and boost engagement
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                        <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            ✨ Premium Quality
                        </span>
                        <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            🎯 High CTR Designs
                        </span>
                        <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            🚀 Results Driven
                        </span>
                    </div>
                </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="relative z-10 px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {thumbnails.map((thumbnail, index) => (
                            <div
                                key={thumbnail.id}
                                data-id={thumbnail.id}
                                data-animate="true"
                                className={`group cursor-pointer transform transition-all duration-700 ${visibleItems.has(thumbnail.id.toString())
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-16 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onClick={() => openFullscreen(thumbnail)}
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-400/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                                    {/* Thumbnail Image */}
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={thumbnail.image}
                                            alt={thumbnail.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    </div>

                                    {/* Thumbnail Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                            {thumbnail.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {selectedThumbnail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
                    <div className="relative max-w-6xl max-h-screen p-6">
                        <button
                            onClick={closeFullscreen}
                            className="absolute -top-2 -right-2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform animate-scale-in">
                            <img
                                src={selectedThumbnail.image}
                                alt={selectedThumbnail.title}
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {selectedThumbnail.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default ThumbnailShowcase;