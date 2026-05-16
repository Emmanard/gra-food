import Image from 'next/image';
import AnimatedSection from './AnimatedSection';
import WhatsAppLinkButton from './WhatsAppLinkButton';
import { Product, buildWhatsAppUrl, formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const whatsAppUrl = buildWhatsAppUrl(
    `Hi GRA Foods, I'd like to enquire about ${product.name} ${product.size}`
  );

  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Product Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Product Name */}
          <h3 className="font-serif text-xl font-semibold text-brand-text leading-snug">
            {product.name}
          </h3>

          {/* Size Label */}
          {product.size && (
            <p className="text-sm text-brand-text/60">{product.size}</p>
          )}

          {/* Price Badge */}
          <span className="inline-block self-start bg-brand-gold/20 text-brand-orange font-semibold text-sm px-3 py-1 rounded-full">
            {formatPrice(product.price)}
          </span>

          {/* Spacer to push button to bottom */}
          <div className="flex-1" />

          <WhatsAppLinkButton
            href={whatsAppUrl}
            label="Order via WhatsApp"
            className="mt-2 self-center"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
