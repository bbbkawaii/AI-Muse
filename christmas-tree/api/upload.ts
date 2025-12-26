import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';

// Cloudflare R2 configuration
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = 'christmas-tree-photos';
const KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID || '';
const KV_API_TOKEN = process.env.CLOUDFLARE_KV_API_TOKEN || '';
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || ''; // R2 bucket public URL

// Helper function to compress and convert image to JPEG
async function compressImage(base64Data: string): Promise<Buffer> {
  // Remove data URL prefix
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Image, 'base64');
}

// Helper function to store data in Cloudflare KV
async function storeInKV(shareId: string, imageUrls: string[]): Promise<void> {
  const data = {
    images: imageUrls,
    createdAt: Date.now(),
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${shareId}?expiration_ttl=2592000`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${KV_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to store in KV: ${response.statusText}`);
  }
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    if (images.length > 22) {
      return res.status(400).json({ error: 'Maximum 22 images allowed' });
    }

    // Generate unique share ID
    const shareId = nanoid(8);
    const imageUrls: string[] = [];

    // Upload all images to R2
    for (let i = 0; i < images.length; i++) {
      const imageData = images[i];
      const imageBuffer = await compressImage(imageData);

      // Generate unique filename
      const filename = `${shareId}/${i}.jpg`;

      // Upload to R2
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: imageBuffer,
        ContentType: 'image/jpeg',
      });

      await s3Client.send(command);

      // Construct public URL
      // R2 public URL already points to the bucket root
      const imageUrl = `${R2_PUBLIC_URL}/${filename}`;
      imageUrls.push(imageUrl);
    }

    // Store share data in KV with 30-day expiration
    await storeInKV(shareId, imageUrls);

    // Return share link
    const shareLink = `${req.headers.origin || 'https://your-app.vercel.app'}/?share=${shareId}`;

    return res.status(200).json({
      success: true,
      shareId,
      shareLink,
      imageCount: imageUrls.length,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Failed to upload images', 
      message: error.message 
    });
  }
}

