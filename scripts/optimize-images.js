import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const INPUT_DIRS = [
  path.join(PUBLIC_DIR, 'images'),
  // Add other directories containing raw images here
];

async function optimizeImages() {
  console.log('🖼️ Starting Image Optimization Pipeline...');
  
  for (const dir of INPUT_DIRS) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, `${path.parse(file).name}.webp`);

        try {
          await sharp(inputPath)
            .webp({ quality: 80, effort: 6 })
            .resize({ width: 1920, withoutEnlargement: true }) // Scale down huge photos
            .toFile(outputPath);
            
          console.log(`✅ Optimized: ${file} -> ${path.parse(file).name}.webp`);
          
          // Optional: Delete original after conversion
          // fs.unlinkSync(inputPath);
        } catch (error) {
          console.error(`❌ Failed to optimize ${file}:`, error);
        }
      }
    }
  }
  
  console.log('✨ All images optimized successfully for production.');
}

optimizeImages();
