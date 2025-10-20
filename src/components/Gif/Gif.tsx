import { Image } from "primereact/image";

const urls = [
  "happy bbc two GIF by BBC.gif",
  "Happy Lets Go GIF by Pudgy Penguins.gif",
  "Star Wars Dancing GIF.gif",
  "star wars GIF.gif",
  "Paramount Network Yes GIF by Yellowstone.gif",
  "Excited Lets Go GIF.gif",
  "Champions League Win GIF by Manchester United.gif",
  "Happy Celebration GIF by MightyMike.gif",
  "Miguel Herrera Win GIF.gif",
  "Steve Austin Celebration GIF.gif",
  "Jim Carrey Dancing GIF.gif",
];

export const Gif = ({ success }: { success: boolean | undefined }) => {
  if (!success) return null;

  const randomGif = urls[Math.floor(Math.random() * urls.length)];
  const gifPath = `/gif/${randomGif}`;

  return (
    <Image
      src={gifPath}
      alt="Gif"
      width="auto"
      height="200px"
      style={{ objectFit: "contain" }}
    />
  );
};
