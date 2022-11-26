import React from "react";
import Editor from "@monaco-editor/react";

export const expandedRowRender = ({config_value}) => (
  <Editor
    defaultLanguage="json"
    height="150px"
    options={{
      minimap: {
        enabled: false,
      },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      scrollbar: {
        vertical: "hidden",
      },
      overviewRulerBorder: false,
      readOnly: true,
    }}
    value={JSON.stringify(JSON.parse(config_value), null, 2)}
  />
);
