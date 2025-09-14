"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Zap, Target, TrendingUp } from "lucide-react"
import BackgroundIMG from '../assets/ExampleIMG.jpg';


const ThumbnailShowcase = () => {
    const [selectedThumbnail, setSelectedThumbnail] = useState(null)
    const [visibleItems, setVisibleItems] = useState(new Set())
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [loadingImages, setLoadingImages] = useState(new Set())

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

    const handleImageLoadStart = (thumbnailId) => {
        setLoadingImages((prev) => new Set(prev).add(thumbnailId))
    }

    const handleImageLoadComplete = (thumbnailId) => {
        setLoadingImages((prev) => {
            const newSet = new Set(prev)
            newSet.delete(thumbnailId)
            return newSet
        })
    }

    const LoadingSpinner = () => (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm">
            <div className="relative">
                {/* Outer rotating ring */}
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
                {/* Inner pulsing dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
                {/* Glowing effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-400/20 rounded-full animate-ping"></div>
            </div>
        </div>
    )

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => new Set(prev).add(entry.target.dataset.id))
                    }
                })
            },
            { threshold: 0.1, rootMargin: "50px" },
        )

        const elements = document.querySelectorAll("[data-animate]")
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    const openFullscreen = (thumbnail) => {
        setSelectedThumbnail(thumbnail)
        document.body.style.overflow = "hidden"
    }

    const closeFullscreen = () => {
        setSelectedThumbnail(null)
        document.body.style.overflow = "auto"
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950">
                {/* Mesh gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/20 to-pink-500/10"></div>

                {/* Dynamic floating orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"
                        style={{
                            left: `${20 + mousePosition.x * 0.02}%`,
                            top: `${10 + mousePosition.y * 0.01}%`,
                        }}
                    ></div>
                    <div
                        className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"
                        style={{
                            right: `${15 + mousePosition.x * -0.015}%`,
                            bottom: `${20 + mousePosition.y * -0.01}%`,
                        }}
                    ></div>
                    <div
                        className="absolute w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                        style={{
                            left: `${60 + mousePosition.x * 0.01}%`,
                            top: `${60 + mousePosition.y * 0.015}%`,
                        }}
                    ></div>
                </div>

                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 pt-24 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Floating badge */}

                    <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tight animate-fade-in">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                            THUMBNAIL
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                            SHOWCASE
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay font-light">
                        Discover eye-catching YouTube thumbnail designs that drive clicks and boost engagement.
                        <span className="text-purple-300 font-medium"> Crafted by professionals, proven by results.</span>
                    </p>

                    {/* Enhanced feature badges */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-full border border-purple-400/30 text-white/90 hover:bg-cyan-50/5 transition-colors duration-300">
                            <Sparkles className="w-4 h-4 text-purple-300" />
                            Premium Quality Designs
                        </span>
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-full border border-cyan-400/30 text-white/90 hover:bg-cyan-50/5 transition-colors duration-300">
                            <Target className="w-4 h-4 text-cyan-300" />
                            High CTR
                        </span>
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-md rounded-full border border-emerald-400/30 text-white/90 hover:bg-cyan-50/5 transition-colors duration-300">
                            <TrendingUp className="w-4 h-4 text-emerald-300" />
                            Results Driven
                        </span>
                    </div>

                </div>
            </div>

            <div className="relative z-10 px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {thumbnails.map((thumbnail, index) => (
                            <div
                                key={thumbnail.id}
                                data-id={thumbnail.id}
                                data-animate="true"
                                className={`group cursor-pointer transform transition-all duration-700 ${visibleItems.has(thumbnail.id.toString()) ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onClick={() => openFullscreen(thumbnail)}
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-400/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                                    {/* Thumbnail Image */}
                                    <div className="aspect-video relative overflow-hidden">
                                        {loadingImages.has(thumbnail.id) && <LoadingSpinner />}
                                        <img
                                            src={thumbnail.image || "/placeholder.svg"}
                                            alt={thumbnail.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onLoadStart={() => handleImageLoadStart(thumbnail.id)}
                                            onLoad={() => handleImageLoadComplete(thumbnail.id)}
                                            onError={() => handleImageLoadComplete(thumbnail.id)}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Thumbnail Info */}
                                    <div className="px-6 py-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                                            {thumbnail.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedThumbnail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl">
                    <div className="relative max-w-6xl max-h-screen p-6">
                        <button
                            onClick={closeFullscreen}
                            className="absolute -top-2 -right-2 z-10 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/20"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform animate-scale-in border border-white/20">
                            {loadingImages.has(`fullscreen-${selectedThumbnail.id}`) && <LoadingSpinner />}
                            <img
                                src={selectedThumbnail.image || "/placeholder.svg"}
                                alt={selectedThumbnail.title}
                                className="w-full h-auto max-h-[80vh] object-contain"
                                onLoadStart={() => handleImageLoadStart(`fullscreen-${selectedThumbnail.id}`)}
                                onLoad={() => handleImageLoadComplete(`fullscreen-${selectedThumbnail.id}`)}
                                onError={() => handleImageLoadComplete(`fullscreen-${selectedThumbnail.id}`)}
                            />
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
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(-180deg); }
                }
                
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
                    50% { transform: translateY(-100px) translateX(20px); opacity: 1; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
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
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                }
                
                .animate-float-particle {
                    animation: float-particle 4s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 3s ease-in-out infinite;
                }
                
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default ThumbnailShowcase
