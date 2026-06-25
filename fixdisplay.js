const fs = require('fs');

// Fix ProductCard - replace name.slice with proper display
let card = fs.readFileSync('src/components/product/ProductCard.tsx', 'utf8');
card = card.replace(
  '{product.name.slice(0,2)}',
  `{product.tag === 'Rudraksha' ? '🟤' : product.tag === 'Jewellery' ? '💍' : product.tag === 'Organic' ? '🪸' : product.certified ? '💎' : '🔮'}`
);
fs.writeFileSync('src/components/product/ProductCard.tsx', card);
console.log('ProductCard fixed!');

// Fix catalog page - remove emoji prefix from category names
let catalog = fs.readFileSync('src/app/catalog/page.tsx', 'utf8');
// Remove emoji from sidebar links
catalog = catalog.replace(/{cat\.emoji} {cat\.name}/g, '{cat.name}');
// Also fix the active category title
catalog = catalog.replace(
  "categories.find((c) => c.slug === category)?.name + ' Gemstones'",
  "(categories.find((c) => c.slug === category)?.name || 'All') + ' Gemstones'"
);
fs.writeFileSync('src/app/catalog/page.tsx', catalog);
console.log('Catalog page fixed!');

console.log('All done! Refresh your browser.');
