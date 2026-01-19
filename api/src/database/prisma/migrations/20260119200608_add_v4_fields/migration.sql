-- AlterTable
ALTER TABLE "Product" ADD COLUMN "demoUrl" TEXT;
ALTER TABLE "Product" ADD COLUMN "iconColor" TEXT;
ALTER TABLE "Product" ADD COLUMN "iconInitials" TEXT;
ALTER TABLE "Product" ADD COLUMN "image" TEXT;
ALTER TABLE "Product" ADD COLUMN "screenshots" TEXT;
ALTER TABLE "Product" ADD COLUMN "techStack" TEXT;

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");
