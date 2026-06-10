

interface PromoBannerProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function PromoBanner({ src, alt = "", className = "" }: PromoBannerProps) {
  return (
    <div className={`mx-auto w-[1248px] ${className}`}>
      <div className="w-full h-[180px]">
        <img src={src} alt={alt} className="rounded-[12px] object-cover w-full h-full" />
      </div>
    </div>
  );
}
