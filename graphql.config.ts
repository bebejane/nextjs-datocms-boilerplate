import "dotenv/config"
import type { IGraphQLConfig } from 'graphql-config'

const defaultConfig = {
	dedupeOperationSuffix: true,
	dedupeFragments: true,
	pureMagicComment: false,
	exportFragmentSpreadSubTypes: true,
	namingConvention: "keep",
	skipDocumentsValidation: false,
}

const config: IGraphQLConfig = {
	schema: {
		"https://graphql.datocms.com": {
			headers: {
				Authorization: process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN,
				"X-Exclude-Invalid": "true",
			},
		},
	},
	documents: "lib/graphql/**/*.gql",
	extensions: {
		codegen: {
			overwrite: true,
			generates: {
				"@types/datocms.d.ts": {
					plugins: [
						"typescript",
						"typescript-operations",
					],
					config: { ...defaultConfig, noExport: true }
				},
				"lib/graphql/index.ts": {
					plugins: ["typed-document-node"],
					config: { ...defaultConfig }
				},
				"@types/document-modules.d.ts": {
					plugins: ["typescript-graphql-files-modules"],
					config: { ...defaultConfig }
				},
			},
		}
	},
}

export default config;