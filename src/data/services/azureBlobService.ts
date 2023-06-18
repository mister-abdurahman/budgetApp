import { BlobServiceClient } from "@azure/storage-blob";

export async function uploadImage(file: File) {
    const ACCT_NAME = "fgbmfi"
    const SAS_TOKEN = "sp=racwdli&st=2023-06-18T12:57:25Z&se=2023-06-18T20:57:25Z&sv=2022-11-02&sr=c&sig=1hRkn6KxY0HERgjg3fNq53K2BtSoAxR4Oty9LIPEA3U%3D";

    const uploadUrl = `https://${ACCT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`;
    console.log(uploadUrl);

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