import { useCallback, useState, type ReactNode } from "react";
import { ExternalLink, X } from "lucide-react";

declare global {
  interface Window {
    gtag?: (
      event: string,
      action: string,
      params: Record<string, unknown>,
    ) => void;
  }
}

interface ISponsorBannerProps {
  imageUrl?: string;
  logoUrl?: string;
  linkUrl?: string;
  alt?: string;
  dismissible?: boolean;
}

const SponsorBanner = ({
  imageUrl,
  linkUrl,
  logoUrl,
  alt,
  dismissible = false,
}: ISponsorBannerProps): ReactNode => {
  const [dismissed, setDismissed] = useState(false);

  const displayUrl = logoUrl || imageUrl;
  const isLogo = Boolean(logoUrl);
  const hasConfiguredImage = Boolean(displayUrl);
  const imgAlt = alt || "Patrocinador";
  const isClickable = hasConfiguredImage && Boolean(linkUrl);

  const handleSponsorClick = useCallback(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "sponsor_click", {
        sponsor_name: imgAlt,
        link_url: linkUrl,
      });
    }
  }, [imgAlt, linkUrl]);

  if (dismissed) return null;

  const renderImage = (): ReactNode =>
    hasConfiguredImage ? (
      <img
        src={displayUrl!}
        alt={imgAlt}
        className={isLogo
          ? "max-h-32 md:max-h-44 object-contain rounded-lg"
          : "w-full h-auto rounded-xl"
        }
        loading="lazy"
      />
    ) : (
      <div
        className={`flex items-center justify-center w-full ${isLogo ? "h-16" : "h-14 md:h-20"} rounded-xl border border-border-subtle bg-bg-input/30 gap-2`}
      >
        <svg
          className="h-4 w-4 shrink-0 text-text-muted/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 14c1.5-2 3-5.5 3-7 0-2.2-1.8-4-4-4-1.4 0-2.7.7-3.4 1.8L12 7.2l-2.6-3.4C8.7 2.7 7.4 2 6 2 3.8 2 2 3.8 2 6c0 1.5 1.5 5 3 7l7 8 7-8Z" />
        </svg>
        <span className="text-xs text-text-muted/40 font-display tracking-wide">
          Espacio publicitario
        </span>
      </div>
    );

  const renderContent = (): ReactNode => {
    if (!hasConfiguredImage) return renderImage();

    return (
      <div className={isLogo ? "mr-auto max-w-max relative" : "relative"}>
        {isClickable ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className="block transition-all duration-200 hover:scale-[1.01] hover:shadow-md rounded-xl"
            aria-label={`Visitar patrocinador: ${imgAlt}`}
          >
            {renderImage()}
            <div
              className="absolute bottom-1 right-1 flex items-center gap-0.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm pointer-events-none"
              aria-hidden="true"
            >
              <ExternalLink className="h-2.5 w-2.5" />
              <span className="hidden sm:inline">Visitar</span>
            </div>
          </a>
        ) : (
          <div className="w-full rounded-xl">{renderImage()}</div>
        )}
        {dismissible && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute top-1 right-1 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm text-text-muted backdrop-blur-sm border border-border-subtle cursor-pointer"
            aria-label="Cerrar banner de patrocinio"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full">
      {renderContent()}
    </div>
  );
};

export default SponsorBanner;
