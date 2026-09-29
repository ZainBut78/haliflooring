/**
 * Renders a photo as a <picture> so the browser can pick the smallest file
 * that fits the viewport (WebP where supported, JPEG otherwise) instead of
 * downloading a multi-megabyte camera original.
 *
 * `image` is normally an entry from src/assets/generated/images — see
 * scripts/optimize-images.mjs. Pass `sizes` to describe the rendered width so
 * srcset selection is accurate; a wrong value here costs real bandwidth.
 *
 * A plain URL string is also accepted and rendered as a single <img>. A few
 * older landing components still reference remote images directly; making that
 * a supported shape beats duplicating a second image component for them.
 */
export default function ResponsiveImage({
  image,
  alt,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  ...rest
}) {
  if (!image) return null

  const loadingProps = {
    loading,
    decoding: loading === 'eager' ? 'sync' : 'async',
    fetchPriority,
  }

  if (typeof image === 'string') {
    return (
      <img
        src={image}
        alt={alt}
        className={className}
        {...loadingProps}
        {...rest}
      />
    )
  }

  // The manifest size is the largest variant, so it carries the true aspect
  // ratio. Declaring it keeps the layout from shifting while the file loads.
  const intrinsicWidth = width ?? image.width
  const intrinsicHeight = height ?? image.height

  return (
    <picture className="block h-full w-full">
      <source type="image/webp" srcSet={image.webp.srcSet} sizes={sizes} />
      <source type="image/jpeg" srcSet={image.jpg.srcSet} sizes={sizes} />
      <img
        src={image.jpg.src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        className={className}
        {...loadingProps}
        {...rest}
      />
    </picture>
  )
}
