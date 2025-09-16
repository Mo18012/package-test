#!/bin/bash

echo "Fixing all remaining colon errors in JavaScript files..."

# Fix 'use client' directive with extra colon
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/: '\''use client'\''/'\''use client'\''/g' {} \;

# Fix ternary operators with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/? : /? /g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/: : /: /g' {} \;

# Fix string concatenation with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/= : '\''/= '\''/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/\+ : '\''/\+ '\''/g' {} \;

# Fix console.log and toast calls with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/console\.log(: /console.log(/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/toast\.[a-z]\+(: /toast.\1(/g' {} \;

# Fix useState calls with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/useState(: /useState(/g' {} \;
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/setStatus(: /setStatus(/g' {} \;

# Fix style properties with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/{: '\''/{'\''/g' {} \;

# Fix string replacements with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/replace(: /replace(/g' {} \;

# Fix className with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/className={`\${: /className={`\${/g' {} \;

# Fix handleIconChange calls with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/handleIconChange(: /handleIconChange(/g' {} \;

# Fix headers object with extra colons
find /Users/vijaypandey/Developer/w2n-functions-test/app/javascript -type f -name "*.js" -exec sed -i '' 's/headers{ : /headers{ /g' {} \;

echo "All JavaScript files fixed!"