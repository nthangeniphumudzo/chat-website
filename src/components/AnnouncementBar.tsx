export default function AnnouncementBar() {
  return (
    <a
      href="#download"
      className="fixed top-0 left-0 right-0 z-[60] h-10 flex items-center justify-center bg-[#050505] border-b border-white/[0.06] group"
    >
      <p className="text-sm text-center px-4">
        <span className="font-dm text-white/60 tracking-wide">Your </span>
        <span className="font-syne italic text-white font-semibold tracking-wide">crush</span>
        <span className="font-dm text-white/60 tracking-wide"> has already downloaded the app — </span>
        <span className="font-dm text-mint tracking-wide group-hover:underline underline-offset-2 transition-all duration-200">
          join them below ↓
        </span>
      </p>
    </a>
  )
}
