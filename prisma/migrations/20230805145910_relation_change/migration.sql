/*
  Warnings:

  - The primary key for the `UserChatTypeRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserChatTypeRelation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserChatTypeRelation" DROP CONSTRAINT "UserChatTypeRelation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserChatTypeRelation_pkey" PRIMARY KEY ("userId", "chatTypeId");
