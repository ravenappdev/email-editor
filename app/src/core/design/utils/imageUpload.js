import * as Azure from '@azure/storage-blob';

export const imageUpload = (uploadConfig, file) => {
  const { uploadUri, token, locationId, storageName } = uploadConfig;
  return new Promise((resolve, reject) => {
    fetch(uploadUri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to get SAS token");
        }
      })
      .then(async data => {
        const response = await azureUpload(data.token, storageName, { file }, `emailEditor/upload/${locationId}/${new Date().getTime()}_${file.name}`)
        resolve(response);
      })
      .catch(error => {
        console.error("Failed:", error);
        reject(error);
      });
  });
}


async function azureUpload(sasToken, storageName, payload, blobName) {
  const account = storageName;
  const accountSas = sasToken;
  const containerName = 'images';

  const blockBlobClient = new Azure.BlobServiceClient(
    `https://${account}.blob.core.windows.net${accountSas}`,
    new Azure.AnonymousCredential(),
    {
      retryOptions: { maxTries: 4 },
      telemetry: { value: 'Smorder Admin UI' },
    }
  ).getContainerClient(containerName).getBlobClient(blobName).getBlockBlobClient();

  const res = await blockBlobClient.uploadData(payload.file, {
    blockSize: 4 * 1024 * 1024,
    parallelism: 20,
    blobHTTPHeaders: {
      blobContentType: payload.file.type,
    },
  });

  return {
    errorCode: res.errorCode,
    url: blockBlobClient.url.split('?')[0],
  };
}
