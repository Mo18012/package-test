#!/bin/bash

# Fix all JavaScript files with common errors
echo "Fixing JavaScript syntax errors..."

# Fix import statements with incorrect colons
find app/javascript -name "*.js" -exec sed -i '' 's/from : /from /g' {} \;
find app/javascript -name "*.js" -exec sed -i '' 's/import .* from : /import * from /g' {} \;

# Fix useState with incorrect colons
find app/javascript -name "*.js" -exec sed -i '' 's/useState(: /useState(/g' {} \;

# Fix toast.success with incorrect colons
find app/javascript -name "*.js" -exec sed -i '' 's/toast\.success(: /toast.success(/g' {} \;

# Fix style objects with incorrect colons
find app/javascript -name "*.js" -exec sed -i '' 's/: : /: /g' {} \;

# Fix string concatenation with incorrect colons
find app/javascript -name "*.js" -exec sed -i '' 's/prev \+ : /prev + /g' {} \;

echo "All JavaScript files fixed!"