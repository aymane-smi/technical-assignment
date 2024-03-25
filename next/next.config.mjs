/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [{
            source: "/:path*",
            destination: "https://unsplash.com/developers/:path*"
        }];
    }
};

export default nextConfig;
