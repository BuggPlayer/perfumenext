# Product Images Guide

## Current Setup

The application currently uses HTML placeholder files for product images. These are located in:
```
public/images/products/
```

## Adding Real Product Images

### Option 1: Replace HTML Placeholders with Real Images

1. **Convert HTML to Images**: Use tools like Puppeteer or headless Chrome to convert the HTML placeholders to actual JPG/PNG files
2. **Replace Files**: Replace the `.html` files with real image files (keeping the same names)
3. **Image Formats**: Use JPG or PNG format for best compatibility

### Option 2: Use External Image URLs

Update the `demoData.ts` file to use external image URLs:

```typescript
images: [
  'https://example.com/chanel-no5-1.jpg',
  'https://example.com/chanel-no5-1.jpg',
  'https://example.com/chanel-no5-1.jpg'
]
```

### Option 3: Use Stock Photo Services

1. **Unsplash**: Free high-quality photos
2. **Pexels**: Free stock photos
3. **Pixabay**: Free stock photos and illustrations

## Image Requirements

- **Format**: JPG or PNG
- **Size**: Recommended 800x800px or larger (square aspect ratio)
- **Quality**: High quality (not compressed)
- **Naming**: Keep the same filename structure for consistency

## Example Image URLs

Here are some example URLs you can use for testing:

```typescript
// Chanel N°5
images: [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&crop=entropy'
]

// Dior Sauvage
images: [
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop&crop=center'
]

// Lancôme La Vie Est Belle
images: [
  'https://images.unsplash.com/photo-1590736969955-71cc94901354?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1590736969955-71cc94901354?w=800&h=800&fit=crop&crop=center'
]
```

## Image Optimization

For production, consider:

1. **WebP Format**: Modern, efficient image format
2. **Responsive Images**: Different sizes for different devices
3. **Lazy Loading**: Load images as they come into view
4. **CDN**: Use a content delivery network for faster loading

## Current Placeholder Structure

The current HTML placeholders include:
- Brand name
- Product name
- Decorative icon
- Gradient background
- Professional styling

These can be easily replaced with real product photography while maintaining the same visual hierarchy.

## Troubleshooting

If images don't load:
1. Check file paths in `demoData.ts`
2. Verify image files exist in the correct directory
3. Check browser console for 404 errors
4. Ensure image URLs are accessible

## Next Steps

1. **Replace HTML placeholders** with real product images
2. **Add image optimization** for better performance
3. **Implement lazy loading** for better user experience
4. **Add image fallbacks** for failed loads
