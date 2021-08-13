declare namespace NodeJS {
    interface ProcessEnv {
        AWS_ACCESS_KEY?: string;
        AWS_SECRET?: string;
        BUCKET_NAME?: string;
        CONTENT_API_KEY: string;
        CONTENT_VERSION_API_URL: string;
        CONTENT_CHAPTER_API_URL: string;
        APPLICATION_HEALTH_API_URL: string;
        FILES_PATH: string;
        ASSETS_PATH: string;
        COMMIT_ID?: string;
        PULL_REQUEST_ID?: number;
        CHUNK_SIZE: number;
        INTERVAL_BETWEEN_CHUNKS: number;
        MAX_SERVICE_RETRY?: number;
        HEALTH_CHECK_INTERVAL?: number;
    }
  }