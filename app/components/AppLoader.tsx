import ChatMark from './ChatMark'

/**
 * The pulsing Ch@t mark shown over the page while the first screen's assets
 * arrive, so nobody starts scrolling into content that is still landing.
 *
 * It is deliberately dumb: it renders in the server HTML and is shown or hidden
 * purely by the `app-loading` class on <html>, which the boot script in
 * root.tsx sets before first paint and clears again on load (or on a hard
 * timeout). Nothing here waits on React — if hydration is slow or the bundle
 * never arrives, the overlay still lifts and the page is still usable.
 *
 * The default with no JS at all is *hidden*, so a visitor whose bundle fails
 * gets the page rather than a logo on a blank screen.
 */
export default function AppLoader() {
  return (
    <div className="app-loader" role="status" aria-label="Loading Ch@t">
      <ChatMark className="app-loader-mark" />
    </div>
  )
}
