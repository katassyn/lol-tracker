import React, { useEffect, useState } from "react";

const preparedUiModules = [
  () => import("./prepared-ui/sample-data.jsx"),
  () => import("./prepared-ui/operator-base.jsx"),
  () => import("./prepared-ui/operator-shell.jsx"),
  () => import("./prepared-ui/operator-screens.jsx"),
  () => import("./prepared-ui/operator-app.jsx")
];

export default function App() {
  const [OperatorApp, setOperatorApp] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    window.React = React;

    async function loadPreparedUi() {
      for (const loadModule of preparedUiModules) {
        await loadModule();
      }

      if (!cancelled) {
        setOperatorApp(() => window.OperatorApp);
      }
    }

    loadPreparedUi().catch((error) => {
      console.error("Prepared UI failed to load:", error);
      if (!cancelled) setLoadError(error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loadError) {
    return (
      <div className="op-stage-wrap">
        <div className="op-load-state">
          <strong>Prepared UI failed to load.</strong>
          <span>{loadError.message}</span>
        </div>
      </div>
    );
  }

  if (!OperatorApp) {
    return (
      <div className="op-stage-wrap">
        <div className="op-load-state">Loading Master Track...</div>
      </div>
    );
  }

  return (
    <div className="op-stage-wrap">
      <div className="op-stage">
        <OperatorApp accent="amber" density="comfortable" />
      </div>
    </div>
  );
}
