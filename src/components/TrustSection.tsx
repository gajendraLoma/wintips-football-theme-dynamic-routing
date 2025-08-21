"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TrustSection() {
  const t = useTranslations();

  // Keep only pure numbers for animation
  const stats = [
    { icon: "/images/trustIcon1.webp", value: 1000, suffix: "+", label: t("soccerTips") },
    { icon: "/images/trustIcon2.webp", value: 100, suffix: "+", label: t("soccerTipSources") },
    { icon: "/images/trustIcon3.webp", value: 20, suffix: "+", label: t("reputableBookmakers") },
    { icon: "/images/trustIcon4.webp", value: 157000, suffix: "+", label: t("users") },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          stats.forEach((stat, i) => {
            let start = 0;
            const increment = Math.max(1, Math.ceil(stat.value / 100)); // avoid 0 increment
            const timer = setInterval(() => {
              start += increment;
              if (start >= stat.value) {
                start = stat.value;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[i] = start;
                return newCounts;
              });
            }, 20);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  return (
    <section
      ref={sectionRef}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t("trustTitle")}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {t("trustDescription")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="border rounded-lg shadow-sm hover:shadow-md flex flex-col items-center justify-center py-6 bg-white"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src={Icon} className="w-12 h-12 text-blue-600"  alt={stat.label} width={50} height={50}/>
                </div>
                <div className="text-3xl font-bold text-[#4f4f4f] mb-2">
                  {counts[index].toLocaleString("en-US")}{stat.suffix}
                </div>
                <div className="text-[#070d2d] font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
