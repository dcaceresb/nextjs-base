"use client";
import { LazyImage } from "@/components/RandomFox";
import { MouseEventHandler, useState } from "react";
import { random } from "lodash";

const url = "https://randomfox.ca";

const myRandom = (): number => {
  return random(1, 123);
};
const createId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

const checkLazy = (node: HTMLImageElement) => {
  console.log(node);
};

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const createImage: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const fox: ImageItem = {
      id: createId(),
      url: `${url}/images/${myRandom()}.jpg`,
    };
    setImages([...images, fox]);
    window.plausible("signup");
  };

  return (
    <div>
      <script
        defer
        data-domain="yourdomain.com"
        src="https://plausible.io/js/script.js"
      ></script>
      
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button onClick={createImage}>Add new fox</button>
        {images.map((img) => (
          <LazyImage
            key={img.id}
            src={img.url}
            className="w-80 h-auto rounded-lg bg-gray-300"
            width={320}
            height="auto"
            onLazyLoad={checkLazy}
          ></LazyImage>
        ))}
      </main>
    </div>
  );
}
