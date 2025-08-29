// Simple API route to check if assets are accessible
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const assetsDir = path.join(publicDir, 'assets');
    
    if (!fs.existsSync(assetsDir)) {
      return res.status(404).json({ error: 'Assets directory not found', path: assetsDir });
    }
    
    const files = fs.readdirSync(assetsDir);
    
    const assetInfo = files.map(file => {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        modified: stats.mtime.toISOString()
      };
    });
    
    res.status(200).json({
      assetsDir,
      files: assetInfo,
      count: files.length
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to read assets directory', details: errorMessage });
  }
}
