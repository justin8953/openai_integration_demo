/*
  Warnings:

  - You are about to drop the `ChatType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChatTypeRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserChatTypeRelation" DROP CONSTRAINT "UserChatTypeRelation_chatTypeId_fkey";

-- DropForeignKey
ALTER TABLE "UserChatTypeRelation" DROP CONSTRAINT "UserChatTypeRelation_userId_fkey";

-- DropTable
DROP TABLE "ChatType";

-- DropTable
DROP TABLE "UserChatTypeRelation";
