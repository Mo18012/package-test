#!/bin/bash

echo "Fixing build-time errors in JavaScript files..."

# Fix duplicate property names in style objects
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/right: right: /right: /g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/left: left: /left: /g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/backgroundColor: backgroundColor: /backgroundColor: /g' {} \;

# Fix ternary operators in style objects
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/right ? /right: right ? /g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/left ? /left: left ? /g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/backgroundColor ? /backgroundColor: backgroundColor ? /g' {} \;

# Fix object property syntax in style objects
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/className={\`\${: /className={\`\${/g' {} \;

# Fix JSON syntax in AppsFlyer.js
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "AppsFlyer.js" -exec sed -i '' 's/"price"\.99/"price":0.99/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "AppsFlyer.js" -exec sed -i '' 's/"currency""USD"/"currency":"USD"/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "AppsFlyer.js" -exec sed -i '' 's/placeholder=: /placeholder=/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "AppsFlyer.js" -exec sed -i '' 's/"key""value"/"key":"value"/g' {} \;

# Fix TypeScript remnants in orientation/page.js
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript/orientation -type f -name "page.js" -exec sed -i '' 's/ as : '\''portrait'\'' | : '\''landscape'\''//g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript/orientation -type f -name "page.js" -exec sed -i '' 's/setOrientation(e.target.value as/setOrientation(e.target.value/g' {} \;

# Fix string literals with colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/{: '\''/{'\''/' {} \;

echo "All build errors fixed!"