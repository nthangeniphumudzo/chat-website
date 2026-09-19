import { redirect } from "react-router";
import type { Route } from "./+types/get";
import { detectPlatform } from "../lib/platform";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../constants";

/**
 * /get — the address the desktop QR code encodes.
 *
 * A QR code can only hold one URL, but the phone scanning it could be either
 * kind, so the choice of store happens here, on the phone's own request. The
 * https listings rather than the deep links: a scan opens in the camera's
 * browser sheet, where both open the store app anyway. Anything that is not a
 * phone lands on the homepage.
 */
export function loader({ request }: Route.LoaderArgs) {
  const { os } = detectPlatform(request.headers.get("user-agent") ?? "");
  if (os === "ios") return redirect(APP_STORE_URL, 302);
  if (os === "android") return redirect(GOOGLE_PLAY_URL, 302);
  return redirect("/", 302);
}
