#!/bin/bash

# Script to fix remaining TypeScript elements in JavaScript files
JS_DIR="/Users/vijaypandey/Developer/w2n-functions-test/app/javascript"

# Find all JavaScript files and fix TypeScript elements
find "$JS_DIR" -name "*.js" | while read js_file; do
  echo "Fixing $js_file"
  
  # Create a temporary file
  temp_file=$(mktemp)
  
  # Fix TypeScript elements
  cat "$js_file" | \
    # Remove interface declarations
    sed '/export interface/d' | \
    # Remove generic type parameters from useState
    sed 's/useState<[^>]*>/useState/g' | \
    # Fix component declarations with generic types
    sed 's/const \([a-zA-Z0-9_]*\)<[^>]*> = /const \1 = /g' | \
    # Fix missing colons in style properties
    sed 's/\([a-zA-Z0-9_-]*\)'\''\([^'"'"']*\)'\''/\1: '\''\2'\''/g' > "$temp_file"
  
  # Replace the original file with the fixed one
  mv "$temp_file" "$js_file"
done

echo "All JavaScript files fixed!"