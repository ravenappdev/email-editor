import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { SettingsProvider } from "./context/SettingsContext";
import MainEditor from "./MainEditor";
import { initializeI18n } from "./i18n";
import { UploadProvider } from "./context/UploadProvider";

export const SmartEmailEditor = forwardRef(({ translation, onFileUpload, ...props }, ref) => {
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
      }}
    >
      <UploadProvider uploader={onFileUpload}>
        <MainEditor ref={editorRef} {...props} />
      </UploadProvider>
    </SettingsProvider>
  )
});
