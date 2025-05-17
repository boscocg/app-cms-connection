import { CodegenConfig } from "@graphql-codegen/cli";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const config: CodegenConfig = {
  schema: `${apiUrl}/graphql`,
  documents: ["../app/**/*.tsx", "../lib/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./types/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: false,
        withHooks: false,
        withHOC: false,
        withComponent: false,
        enumsAsTypes: true,
        scalars: {
          DateTime: "string",
          JSON: "Record<string, any>",
          Upload: "File",
        },
      },
    },
  },
};

export default config;
