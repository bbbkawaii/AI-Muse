const KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID || '';
const KV_API_TOKEN = process.env.CLOUDFLARE_KV_API_TOKEN || '';
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';

// Helper function to retrieve data from Cloudflare KV
async function getFromKV(shareId: string): Promise<{ images: string[]; createdAt: number } | null> {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${shareId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${KV_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to retrieve from KV: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('KV retrieval error:', error);
    return null;
  }
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Share ID is required' });
    }

    // Retrieve share data from KV
    const shareData = await getFromKV(id);

    if (!shareData) {
      return res.status(404).json({ error: 'Share not found or expired' });
    }

    return res.status(200).json({
      success: true,
      images: shareData.images,
      createdAt: shareData.createdAt,
    });
  } catch (error: any) {
    console.error('Share retrieval error:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve share', 
      message: error.message 
    });
  }
}

