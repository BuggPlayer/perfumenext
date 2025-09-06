const fs = require('fs');
const path = require('path');

// Create the products directory if it doesn't exist
const productsDir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Product image configurations
const productImages = [
  // Chanel N°5
  { name: 'chanel-no5-1.jpg', brand: 'Chanel', product: 'N°5' },
  { name: 'chanel-no5-2.jpg', brand: 'Chanel', product: 'N°5' },
  { name: 'chanel-no5-3.jpg', brand: 'Chanel', product: 'N°5' },
  
  // Dior Sauvage
  { name: 'dior-sauvage-1.jpg', brand: 'Dior', product: 'Sauvage' },
  { name: 'dior-sauvage-2.jpg', brand: 'Dior', product: 'Sauvage' },
  { name: 'dior-sauvage-3.jpg', brand: 'Dior', product: 'Sauvage' },
  
  // Lancôme La Vie Est Belle
  { name: 'lancome-la-vie-1.jpg', brand: 'Lancôme', product: 'La Vie Est Belle' },
  { name: 'lancome-la-vie-2.jpg', brand: 'Lancôme', product: 'La Vie Est Belle' },
  
  // YSL Black Opium
  { name: 'ysl-black-opium-1.jpg', brand: 'YSL', product: 'Black Opium' },
  { name: 'ysl-black-opium-2.jpg', brand: 'YSL', product: 'Black Opium' },
  
  // Armani Acqua di Gio
  { name: 'armani-acqua-1.jpg', brand: 'Armani', product: 'Acqua di Gio' },
  { name: 'armani-acqua-2.jpg', brand: 'Armani', product: 'Acqua di Gio' },
  
  // Carolina Herrera Good Girl
  { name: 'herrera-good-girl-1.jpg', brand: 'Carolina Herrera', product: 'Good Girl' },
  { name: 'herrera-good-girl-2.jpg', brand: 'Carolina Herrera', product: 'Good Girl' },
  
  // Tom Ford Tobacco Vanille
  { name: 'tom-ford-tobacco-1.jpg', brand: 'Tom Ford', product: 'Tobacco Vanille' },
  { name: 'tom-ford-tobacco-2.jpg', brand: 'Tom Ford', product: 'Tobacco Vanille' },
  
  // Jo Malone Wood Sage & Sea Salt
  { name: 'jo-malone-wood-sage-1.jpg', brand: 'Jo Malone', product: 'Wood Sage & Sea Salt' },
  { name: 'jo-malone-wood-sage-2.jpg', brand: 'Jo Malone', product: 'Wood Sage & Sea Salt' }
];

// Generate HTML files for each image (these will serve as placeholder images)
productImages.forEach(({ name, brand, product }) => {
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>${brand} ${product}</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .container {
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .brand {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .product {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 48px;
      margin-bottom: 20px;
    }
    .placeholder {
      font-size: 14px;
      opacity: 0.7;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">🌸</div>
    <div class="brand">${brand}</div>
    <div class="product">${product}</div>
    <div class="placeholder">Product Image Placeholder</div>
  </div>
</body>
</html>`;

  const filePath = path.join(productsDir, name.replace('.jpg', '.html'));
  fs.writeFileSync(filePath, htmlContent);
  console.log(`Created placeholder for: ${name}`);
});

console.log('\n✅ All product image placeholders created!');
console.log('📁 Location: public/images/products/');
console.log('💡 These are HTML files that can be converted to images or replaced with real product photos');
