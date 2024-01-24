import React, { createContext } from "react";
import PropTypes from "prop-types";

const UploadContext = createContext();

export function UploadProvider({ uploader, children }) {
  return (
    <UploadContext.Provider
      value={{
        uploader: uploader
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

UploadProvider.propTypes = {
  children: PropTypes.node.isRequired,
  uploader: PropTypes.func.isRequired,
};

export const UploadConsumer = UploadContext.Consumer;

export default UploadContext;
