export default {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "drive.google.com", // Matches Google Drive direct links
                port: "",
                pathname: "/uc**", // Matches `/uc` path for Google Drive direct links
            },
        ],
    },
};
