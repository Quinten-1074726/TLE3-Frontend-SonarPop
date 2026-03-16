import { useEffect } from "react";

export default function useDashboardView() {
  useEffect(() => {
    document.body.dataset.appView = "dashboard";

    return () => {
      delete document.body.dataset.appView;
    };
  }, []);
}