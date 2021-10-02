import { S3_BUCKET_URL } from '../constants/url'

interface FileConfig {
  folder: string;
  subfolder?: string;
  fileName: string;
}

export const createImageUrl = ({
  folder,
  subfolder,
  fileName
}: FileConfig) => `${S3_BUCKET_URL}/${folder}/${subfolder && `${subfolder}/`}${fileName}`
