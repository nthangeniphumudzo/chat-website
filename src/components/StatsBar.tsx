const stats = [
  { num: '3', label: 'Questions you write yourself' },
  { num: 'Written', label: 'Answers before the first hello' },
  { num: '100%', label: 'Real — every profile verified' },
  { num: '0', label: 'Awkward openers required' },
]

export default function StatsBar() {
  return (
    <div className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          You know something true about them before you say a word.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-syne font-extrabold text-xl sm:text-2xl lg:text-3xl text-mint tracking-tight leading-none">
                {num}
              </div>
              <div className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 mt-1.5 sm:mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
