/*
  Warnings:

  - You are about to drop the column `name` on the `OpenAIModel` table. All the data in the column will be lost.
  - Added the required column `created` to the `OpenAIModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owned_by` to the `OpenAIModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OpenAIModel" DROP COLUMN "name",
ADD COLUMN     "created" BIGINT NOT NULL,
ADD COLUMN     "owned_by" TEXT NOT NULL;
