import { useLocation } from "react-router-dom";
import { TourProvider } from "./TourProvider";
import { tourRegistry } from "./tourRegistry";

// This app has no student/teacher-style "track" — the only accent split
// the tour engine needs to know about is the forum's own `--fm-*` token
// vocabulary (C6/C8, see theme.css's `[data-track="forum"]` rule). Explore
// and marketing pages already resolve through the base `--sk-*` tokens at
// :root, so they need no override at all.
export default function TourMount({ children }) {
  const location = useLocation();
  const track = location.pathname.startsWith("/forum") ? "forum" : undefined;
  return (
    <TourProvider registry={tourRegistry} track={track}>
      {children}
    </TourProvider>
  );
}
