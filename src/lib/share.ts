export function getWhatsAppShareUrl(text: string): string {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export function getInstagramUrl(handleOrUrl: string): string {
  if (handleOrUrl.startsWith('http')) return handleOrUrl;
  return `https://instagram.com/${handleOrUrl.replace('@', '')}`;
}
