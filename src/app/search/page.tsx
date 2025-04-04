import ExperienceCard from '../components/ExperienceCard';

interface Product {
  productCode: string;
  title: string;
  thumbnailHiResURL?: string;
  thumbnailURL: string;
  rating: number;
  reviewCount: number;
  pricing: { summary: { fromPriceFormatted: string } };
  webURL: string;
}

async function fetchSearchResults(query: string): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch search results');
  const data = await res.json();
  return data.data || [];
}

export default async function Search({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const resolvedSearchParams = await searchParams; // Await the Promise
  const query = resolvedSearchParams.query || '';
  let searchResults: Product[] = [];
  let error: string | null = null;

  if (query) {
    try {
      searchResults = await fetchSearchResults(query);
    } catch (err) {
      error = (err as Error).message;
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ExperienceCard key={product.productCode} product={product} />
          ))}
        </div>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
}