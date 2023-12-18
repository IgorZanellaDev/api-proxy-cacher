-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "method" TEXT NOT NULL,
    "request_url" TEXT NOT NULL,
    "request_payload" TEXT,
    "request_headers" TEXT NOT NULL,
    "response_body" TEXT NOT NULL,
    "response_status" INTEGER NOT NULL,
    "response_headers" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
