-- AlterTable
ALTER TABLE "User" ADD COLUMN     "openAIModelId" TEXT;

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenAIModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "object" TEXT NOT NULL,

    CONSTRAINT "OpenAIModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_openAIModelId_fkey" FOREIGN KEY ("openAIModelId") REFERENCES "OpenAIModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
