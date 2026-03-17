const stats = [
  { num: '100%', label: 'Verified Users' },
  { num: '4', label: 'Core Tabs' },
  { num: '6', label: 'Profile Photos' },
  { num: '3×', label: 'Message Types' },
]

export default function StatsBar() {
  return (
    <div className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
        {stats.map(({ num, label }) => (
          <div key={label} className="text-center">
            <div className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-mint tracking-tight leading-none">
              {num}
            </div>
            <div className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 mt-1.5 sm:mt-2">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
