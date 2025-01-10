import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3333",
				pathname: "/uploads/images/**",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
