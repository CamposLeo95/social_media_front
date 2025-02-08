import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3333",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "storage.cloud.google.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "source.unsplash.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
