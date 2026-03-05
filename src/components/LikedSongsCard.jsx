import { AiFillHeart } from "react-icons/ai";
import { HiOutlinePlay } from "react-icons/hi2";
import { MdShuffle } from "react-icons/md";

export default function LikedSongsCard() {
  return (
    <div className="bg-secondary rounded-xl px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AiFillHeart className="text-text-primary text-2xl" />
        <span className="text-text-primary font-semibold">Liked songs</span>
      </div>

      <div className="flex items-center gap-4 text-text-primary text-2xl">
        <MdShuffle />
        <HiOutlinePlay />
      </div>
    </div>
  );
}