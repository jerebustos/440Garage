const { Jimp } = require('jimp');
const path = require('path');

async function processLogo() {
  try {
    const inputPath = path.join(__dirname, 'public', 'logo.jpg');
    const outputPath = path.join(__dirname, 'public', 'logo-transparent.png');
    
    console.log('Reading image from:', inputPath);
    const image = await Jimp.read(inputPath);
    
    // We want to turn it into a white silhouette with transparent background
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Calculate how "white" the pixel is. The text is white, everything else is blue/black.
      // Blue can have high B, but low R/G. White has high R, G, and B.
      const whiteness = Math.min(r, g, b);
      
      let alpha = 0;
      if (whiteness > 120) {
        // Smooth transition for anti-aliasing
        alpha = Math.min(255, (whiteness - 120) * 2);
      }
      
      // Set pixel to pure white but with the calculated alpha
      this.bitmap.data[idx + 0] = 255; // R
      this.bitmap.data[idx + 1] = 255; // G
      this.bitmap.data[idx + 2] = 255; // B
      this.bitmap.data[idx + 3] = alpha; // A
    });
    
    await image.write(outputPath);
    console.log('Successfully wrote transparent logo to:', outputPath);
  } catch (err) {
    console.error('Error processing logo:', err);
  }
}

processLogo();
