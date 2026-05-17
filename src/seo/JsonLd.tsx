import { getWeddingSchema } from './schema';

export default function JsonLd() {
  const schema = getWeddingSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
