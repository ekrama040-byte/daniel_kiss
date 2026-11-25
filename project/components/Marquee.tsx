'use client';

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  slow?: boolean;
  separator?: string;
}

export default function Marquee({
  text,
  reverse = false,
  slow = false,
  separator = '/',
}: MarqueeProps) {
  const items = Array(8).fill(text);
  const animClass = reverse
    ? 'animate-marquee-reverse'
    : slow
    ? 'animate-marquee-slow'
    : 'animate-marquee';

  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div className={`inline-flex ${animClass}`}>
        {items.map((item, i) => (
          <span key={i} className="mx-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase">
            {item}
            <span className="text-muted-foreground mx-4">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
