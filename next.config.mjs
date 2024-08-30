/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"], // Add or remove extensions as needed
  async headers() {
    return [
      {
        // Matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://4148172018.canvas-app.dscvr.one" }, // Replace with your actual origin(s)
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, email,jwttoken",
          },
        ],
      },

      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "connect-src 'self' https://dancing-faun-bf5242.netlify.app https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://api.devnet.solana.com wss://api.devnet.solana.com/; style-src 'self' https://fonts.googleapis.com ; img-src 'self' https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745 blob: data: https://miro.medium.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
