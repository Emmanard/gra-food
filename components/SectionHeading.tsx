interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean; // white text for dark backgrounds
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  const textColor = light ? "text-white" : "text-brand-text";
  const alignment = centered ? "text-center" : "text-left";

  return (
    <div className={`mb-8 ${alignment}`}>
      {/* font-serif maps to Playfair Display once next/font/google is wired up in layout.tsx */}
      <h2 className={`font-serif text-3xl font-bold leading-tight md:text-4xl ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 font-sans text-lg leading-relaxed ${light ? "text-white/80" : "text-brand-text/70"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
