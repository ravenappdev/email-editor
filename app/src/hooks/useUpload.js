import { useContext } from 'react';
import UploadContext from '../context/UploadProvider';

export default function useUpload() {
  const context = useContext(UploadContext);

  return context;
}
