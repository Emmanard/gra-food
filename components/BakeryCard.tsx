import Image from 'next/image';
import AnimatedSection from './AnimatedSection';
import WhatsAppLinkButton from './WhatsAppLinkButton';
import { BakeryItem, buildWhatsAppUrl } from '@/lib/products';

interface BakeryCardProps {
  item: BakeryItem;
  index: number;
}

export default function BakeryCard({ item, index }: BakeryCardProps) {
  const whatsAppUrl = buildWhatsAppUrl(
    `Hi GRA Foods, I'd like to enquire about ${item.name}`
  );

  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Bakery Item Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Item Name */}
          <h3 className="font-serif text-xl font-semibold text-brand-text leading-snug">
            {item.name}
          </h3>

          {/* Spacer to push button to bottom */}
          <div className="flex-1" />

          <WhatsAppLinkButton
            href={whatsAppUrl}
            label="Enquire via WhatsApp"
            className="mt-2 self-center"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
