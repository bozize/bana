import NodeCache from 'node-cache';
import { NextResponse } from 'next/server';

const cache = new NodeCache({ stdTTL: 604800 }); // Cache for 7 days

interface Destination {
  destinationId: number;
  name: string;
}

interface DestinationsResponse {
  data: Destination[];
}

export async function GET(): Promise<NextResponse> {
  const cachedDestinations = cache.get<DestinationsResponse>('destinations');
  if (cachedDestinations) {
    return NextResponse.json(cachedDestinations);
  }

  try {
    const response = await fetch('https://api.sandbox.viator.com/partner/destinations', {
      headers: {
        'exp-api-key': process.env.VIATOR_API_KEY || '',
        'Accept': 'application/json;version=2.0',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch destinations');
    const data: DestinationsResponse = await response.json();
    cache.set('destinations', data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}