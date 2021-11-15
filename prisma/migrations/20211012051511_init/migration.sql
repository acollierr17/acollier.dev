-- CreateTable
CREATE TABLE "Views" (
    "slug" VARCHAR(128) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("slug")
);
