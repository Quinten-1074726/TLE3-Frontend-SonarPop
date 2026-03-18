import { HiOutlinePlay } from "react-icons/hi2";
import { TbDice5 } from "react-icons/tb";

export default function RandomSongCard({ title = "Random Song", onPlay }) {
  return (
    <div className="w-full max-w-md">
      <div
        className="
          flex items-center justify-between w-full
          rounded-xl px-5 py-4
          bg-secondary
        "
      >
        <div className="flex items-center gap-4 min-w-0">
          <TbDice5 className="text-text-primary text-xl" />

          <span className="text-text-primary font-semibold truncate">
            {title}
          </span>
        </div>

        <button
          type="button"
          aria-label="Play random song"
          onClick={onPlay}
          className="text-text-primary transition hover:scale-110"
        >
          <HiOutlinePlay className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
