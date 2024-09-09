import ReactDOM from "react-dom/client";
import App from "@/components/App.tsx";
import Popup from "@/components/Popup.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App>
    <Popup />
  </App>,
);
