import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { SettingsProvider } from "./context/SettingsContext";
import MainEditor from "./MainEditor";
import { initializeI18n } from "./i18n";
import { UploadProvider } from "./context/UploadProvider";

export const SmartEmailEditor = forwardRef(({ translation, placeholders, onFileUpload, ...props }, ref) => {
  initializeI18n(translation);
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    fetchState() {
      if (editorRef.current) {
        editorRef.current.fetchState();
      }
    },
  }));

  return (
    <SettingsProvider
      settings={{
        theme: props.theme,
        editor: {
          placeholders,
        }
      }}
    >
      <UploadProvider uploader={onFileUpload}>
        <MainEditor ref={editorRef} {...props} />
      </UploadProvider>
    </SettingsProvider>
  )
});
