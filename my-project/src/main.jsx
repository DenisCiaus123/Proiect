import { createRoot } from "react-dom/client";
import { App } from "./App";
import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();

const rootDiv = document.getElementById("root");
const virtualDom = createRoot(rootDiv);

virtualDom.render(<App />);
