-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChatType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChatTypeRelation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "chatTypeId" INTEGER NOT NULL,

    CONSTRAINT "UserChatTypeRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserChatTypeRelation" ADD CONSTRAINT "UserChatTypeRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChatTypeRelation" ADD CONSTRAINT "UserChatTypeRelation_chatTypeId_fkey" FOREIGN KEY ("chatTypeId") REFERENCES "ChatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
