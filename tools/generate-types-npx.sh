#!/bin/bash

if [ ! -d "../types" ]; then
  mkdir -p "../types"
  echo "Created types directory"
fi

echo "Generating types from GraphQL schema..."
cd ..
npx -y @graphql-codegen/cli --config tools/codegen.alt.ts

echo "Types generated successfully!"
