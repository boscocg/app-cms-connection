#!/bin/bash

if [ ! -d "../types" ]; then
  mkdir -p "../types"
  echo "Created types directory"
fi

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Generating types from GraphQL schema..."
npm run generate

echo "Types generated successfully!"
