#!/bin/bash

# Script to convert TypeScript files to JavaScript with better handling of CSS styles
TS_DIR="/Users/vijaypandey/Developer/w2n-functions-test/app/typescript"
JS_DIR="/Users/vijaypandey/Developer/w2n-functions-test/app/javascript"

# Function to convert a TypeScript file to JavaScript
convert_file() {
  local ts_file=$1
  local js_file=${ts_file/$TS_DIR/$JS_DIR}
  local js_file=${js_file/.tsx/.js}
  
  # Create directory if it doesn't exist
  mkdir -p "$(dirname "$js_file")"
  
  # Convert TypeScript to JavaScript with improved handling
  cat "$ts_file" | \
    # Fix CSS style objects - direct replacement
    sed 's/\.CSSProperties = {/ = {/g' | \
    # Remove React.FC type annotations
    sed 's/: React\.FC<[^>]*>//g' | \
    sed 's/: React\.FC//g' | \
    # Remove common type annotations
    sed 's/: string//g' | \
    sed 's/: number//g' | \
    sed 's/: boolean//g' | \
    sed 's/: any//g' | \
    sed 's/: void//g' | \
    sed 's/: [a-zA-Z0-9_]*\[\]//g' | \
    sed 's/: [a-zA-Z0-9_]*//g' | \
    # Remove type parameters but preserve JSX
    sed '/^interface /d' | \
    sed '/^type /d' | \
    # Change file extensions in imports
    sed 's/\.tsx/\.js/g' | \
    # Remove parameter type annotations
    sed 's/\([a-zA-Z0-9_]*\): [a-zA-Z0-9_<>\[\]|&]*\([,)]\)/\1\2/g' | \
    # Remove return type annotations
    sed 's/): [a-zA-Z0-9_<>\[\]|&]* =>/)/g' > "$js_file"
  
  echo "Converted $ts_file to $js_file"
}

# Clean the JavaScript directory first
rm -rf "$JS_DIR"/*

# Recreate the directory structure
mkdir -p "$JS_DIR"

# Find all TypeScript files and convert them
find "$TS_DIR" -name "*.tsx" | while read ts_file; do
  convert_file "$ts_file"
done

# Also convert .ts files (like global.d.ts)
find "$TS_DIR" -name "*.ts" -not -name "*.d.ts" | while read ts_file; do
  convert_file "$ts_file"
done

echo "Conversion complete!"