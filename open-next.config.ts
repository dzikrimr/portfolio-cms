import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// "build" is the Cloudflare entrypoint (opennextjs-cloudflare build), so point
// OpenNext at the plain Next.js build to avoid recursing into itself.
config.buildCommand = "npm run build:next";

export default config;
