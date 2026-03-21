import { Phone } from "lucide-react";

const PHONE_NUMBER = "(866) 793-4155";
const PHONE_HREF = "tel:+18667934155";

export function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <a
        href={PHONE_HREF}
        className="flex h-14 items-center justify-center gap-2 bg-primary text-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
      >
        <Phone className="h-5 w-5" />
        <span className="text-sm font-semibold">Call Now</span>
        <span className="text-sm font-medium text-white/80">
          {PHONE_NUMBER}
        </span>
      </a>
    </div>
  );
}
