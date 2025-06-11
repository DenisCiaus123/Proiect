import {createRoot} from "react-dom/client";
import {App} from "./App";

const rootDiv = document.getElementById("root");
const virtualDom = createRoot(rootDiv);

virtualDom.render(<App />);