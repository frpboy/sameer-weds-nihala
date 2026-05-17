export function getWhatsAppShareUrl(text: string): string {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export async function shareToInstagram(text: string, url: string): Promise<boolean> {
  const fullText = `${text} View details & RSVP: ${url}`;
  if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
    try {
      await navigator.share({
        title: 'Shabin & Sana Wedding Invitation',
        text: text,
        url: url,
      });
      return true;
    } catch (err) {
      // Fallback if user cancels or share fails
    }
  }
  // Fallback: copy to clipboard and open Instagram
  try {
    await navigator.clipboard.writeText(fullText);
  } catch (e) {
    // ignore
  }
  window.open('https://instagram.com', '_blank', 'noopener,noreferrer');
  return false;
}
