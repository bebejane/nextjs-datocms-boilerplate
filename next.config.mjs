/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: ["./components", "./pages"],
		prependData: `
    	@use "sass:math";
    	@import "./lib/styles/mediaqueries"; 
    	@import "./lib/styles/fonts";
  	`,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: {
		buildActivity: false,
	},
	webpack: (config, ctx) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		});
		return config;
	},
};

export default nextConfig;
