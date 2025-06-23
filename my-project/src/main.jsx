import { createRoot } from "react-dom/client";
import { App } from "./App";

if (typeof window !== "undefined") {
  import("@vercel/analytics").then(({ inject }) => inject());
  import("@vercel/speed-insights").then(({ injectSpeedInsights }) =>
    injectSpeedInsights()
  );
}

const rootDiv = document.getElementById("root");
const virtualDom = createRoot(rootDiv);

virtualDom.render(<App />);
