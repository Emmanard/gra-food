import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GRA Foods | Good, Rich, Affordable Nutrition",
    short_name: "GRA Foods",
    description:
      "Wholesome Nigerian breakfast cereals, snacks, staples, and freshly baked goods.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#8B0000",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
