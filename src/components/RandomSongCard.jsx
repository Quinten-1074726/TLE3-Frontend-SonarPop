import { HiOutlinePlay } from "react-icons/hi2";
import { MdShuffle } from "react-icons/md";
import { TbDice5 } from "react-icons/tb";

export default function RandomSongCard({
  title = "Random Song",
  onPlay,
  onShuffle,
}) {
  return (
    <div className="bg-secondary rounded-2xl px-5 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <TbDice5 className="text-text-primary text-2xl" />
        </div>

        <span className="text-text-primary font-semibold text-xl truncate">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-4 text-text-primary">
        <button
          type="button"
          aria-label="Shuffle random song"
          onClick={onShuffle}
          className="transition hover:scale-110"
        >
          <MdShuffle className="text-3xl" />
        </button>

        <button
          type="button"
          aria-label="Play random song"
          onClick={onPlay}
          className="transition hover:scale-110"
        >
          <HiOutlinePlay className="text-4xl" />
        </button>
      </div>
    </div>
  );
}