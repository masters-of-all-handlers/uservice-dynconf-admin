import React from "react";
import Editor from "@monaco-editor/react";

export const expandedRowRender = (record) => (
  <Editor
    defaultLanguage="json"
    height="150px"
    options={{
      formatOnPaste: true,
      formatOnType: false,
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
    value={JSON.stringify(JSON.parse(record.value), null, 2)}
  />
);
