/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    
    images: {
        loader: 'custom',
        loaderFile: './imageLoader.js',
    },
}

module.exports = nextConfig
