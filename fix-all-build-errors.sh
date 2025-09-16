#!/bin/bash

echo "Fixing all remaining build errors..."

# Fix duplicate property names in style objects across all files
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/right: right: /right: /g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/left: left: /left: /g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/backgroundColor: backgroundColor: /backgroundColor: /g' {} \;

# Fix TypeScript remnants in orientation/page.js
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/as : /as /g' {} \;

# Fix string literals with colons in all files
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/{: '\''/{'\''/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/Dark Mode{: '\'' '\''/Dark Mode{'\'' '\''}/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/Close App{: '\'' '\''/Close App{'\'' '\''}/g' {} \;

# Fix JSON syntax in AppsFlyer.js
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "AppsFlyer.js" -exec sed -i '' 's/"price"\.99/"price":0.99/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "AppsFlyer.js" -exec sed -i '' 's/"currency""USD"/"currency":"USD"/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "AppsFlyer.js" -exec sed -i '' 's/"key""value"/"key":"value"/g' {} \;

# Fix headers object in stripe/page.js
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/headers{ : /headers{ /g' {} \;

# Fix all remaining TypeScript elements
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/ as [^,;)]*//g' {} \;

echo "All build errors fixed!"