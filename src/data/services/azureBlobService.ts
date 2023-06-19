import { BlobServiceClient } from "@azure/storage-blob";

export async function uploadImage(file: File) {
    const SAS_TOKEN = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN;
    const ACCT_NAME = import.meta.env.VITE_AZURE_STORAGE_RESOURCE_NAME;
    

    const uploadUrl = `https://${ACCT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`;

    const blobServiceClient = new BlobServiceClient(uploadUrl);
    console.log("blobServiceClient", blobServiceClient);

    const containerClient = blobServiceClient.getContainerClient("documents");
    console.log("containerClient", containerClient);

    const blobClient = containerClient.getBlobClient(file.name);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const result = await blockBlobClient.uploadData(file, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
    });

    console.log(`Upload of file '${file.name}' completed`);
    return result._response.request.url;
}