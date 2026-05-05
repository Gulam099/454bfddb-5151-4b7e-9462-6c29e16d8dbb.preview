"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function HeroSection() {
    const images = [
        "/image-1.jpg",
        "/image-2.jpg",
        "/image-3.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="relative pt-12 md:pt-16 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* LEFT TEXT */}
                    <div className="space-y-8 pt-4 md:pt-10">

                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Your Trusted Partner for{" "}
                            <span className="text-primary">
                                Tax, Loan & Financial Services
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground font-medium">
                            GST | Income Tax | Loans | Insurance | Business Registration —{" "}
                            <span className="font-semibold text-foreground">
                                sab kuch ek hi jagah.
                            </span>{" "}
                            Bareilly ke trusted consultant ke saath apna kaam fast aur tension-free karayein.
                        </p>

                    </div>

                    {/* RIGHT IMAGE SLIDER */}
                    <div className="relative hidden md:block">
                        <div className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-muted">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Hero slider ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-card px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 z-20 border border-border/50">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-xl leading-none mb-1">1000+</p>
                                <p className="text-sm text-muted-foreground font-medium">Happy Clients</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}