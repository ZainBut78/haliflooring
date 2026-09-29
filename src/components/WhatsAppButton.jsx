import React, { useEffect, useState } from 'react'
import { SITE } from '../data/content'

/**
 * Fixed WhatsApp shortcut, bottom-right on every page.
 *
 * Deliberately an <a> and not a button+handler: wa.me is a normal web address,
 * so the link is crawlable, works with middle-click and "open in new tab", and
 * still resolves if the JavaScript never arrives. The pre-filled message makes
 * the first reply useful rather than "hi".
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  // Fade in once, shortly after load, so it does not compete with the hero.
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <a
      href={`${SITE.whatsapp}?text=${encodeURIComponent(
        'Hi Hali Flooring, I would like a free quote for flooring in Bolton.'
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      // The pulse rings live inside the button, in the same box as the icon, so
      // they stay concentric with it at every breakpoint. The earlier approach —
      // a separate fixed wrapper — drifted out of alignment as soon as the pill
      // widened on hover, because the button is right-anchored and the label
      // opens to the left while the wrapper stayed put.
      className={`group fixed bottom-5 right-5 z-[55] flex items-center rounded-full bg-[#25D366] text-white h-[60px] w-[60px] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-shadow duration-300 ease-out active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 motion-reduce:transition-none lg:w-auto lg:pr-5 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      {/* Icon + pulses share one fixed 60px box, so the rings can never drift
          away from the glyph they are meant to be drawing attention to. */}
      <span className="wa-pulse relative flex h-[60px] w-[60px] shrink-0 items-center justify-center">
        <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]/45" />
        <span className="wa-ring wa-ring-delay absolute inset-0 rounded-full bg-[#25D366]/45" />
        <svg
          className="relative h-8 w-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.83 9.83 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413" />
        </svg>
      </span>

      {/* Opens to the left of the icon, so the icon — and the rings around it —
          never move. Collapsed to zero width until hover, so the button is a
          plain round dot until someone reaches for it. */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-extrabold uppercase tracking-wide opacity-0 transition-all duration-300 group-hover:max-w-[9rem] group-hover:ml-3 group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:ml-3 group-focus-visible:opacity-100">
        WhatsApp
      </span>
    </a>
  )
}
