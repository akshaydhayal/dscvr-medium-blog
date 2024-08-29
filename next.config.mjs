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
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },

      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "connect-src 'self' https://dancing-faun-bf5242.netlify.app https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://api.devnet.solana.com wss://api.devnet.solana.com/; style-src 'self' https://fonts.googleapis.com ; style-src 'self' ; img src 'self' blob: data: https://miro.medium.com/v2/resize:fit:1024/1*yBt65HhmARbqZDDJ1McFDg.png;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
