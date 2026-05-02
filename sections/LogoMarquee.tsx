
import React, { useEffect, useRef } from 'react';

const LogoMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;
    const speed = 0.025;

    const animate = () => {
      position -= speed;
      if (position <= -50) {
        position = 0;
      }
      marquee.style.transform = `translateX(${position}%)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const tools = [
    { name: 'N8N', slug: 'n8n' },
    { name: 'Make', slug: 'make' },
    { name: 'Zapier', slug: 'zapier' },
    { name: 'OpenAI', slug: 'openai' },
    { name: 'WhatsApp', slug: 'whatsapp' },
    { name: 'Airtable', slug: 'airtable' },
    { name: 'Google Sheets', slug: 'googlesheets' },
    { name: 'Gmail', slug: 'gmail' },
    { name: 'Discord', slug: 'discord' },
    { name: 'Telegram', slug: 'telegram' },
  ];

  const allTools = [...tools, ...tools, ...tools, ...tools];

  return (
    <section className="py-32 bg-[#050d1a] border-y border-[#3B82F6]/10 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050d1a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050d1a] to-transparent z-10" />

        <div
          ref={marqueeRef}
          className="flex items-center gap-40 whitespace-nowrap"
          style={{ width: 'fit-content' }}
        >
          {allTools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 transition-all duration-300 opacity-40 hover:opacity-100 hover:scale-110 grayscale hover:grayscale-0"
            >
              <img 
                src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                alt={tool.name} 
                className="h-24 w-24 object-contain"
                loading="lazy"
              />
              <span className="text-white/40 text-[10px] tracking-widest font-bold">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <p className="text-[#3B82F6]/40 text-[10px] tracking-[0.4em] font-black">
          Powered by Industry Leading Tech
        </p>
      </div>
    </section>
  );
};

export default LogoMarquee;
