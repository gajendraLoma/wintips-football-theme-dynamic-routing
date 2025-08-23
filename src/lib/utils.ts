export function getFullImageUrl(src: string): string {
  if (src?.startsWith('http://') || src?.startsWith('https://')) {
    return src;
  }
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${src}`;
}

