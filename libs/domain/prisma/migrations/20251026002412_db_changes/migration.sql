/*
  Warnings:

  - You are about to drop the column `features` on the `plan` table. All the data in the column will be lost.
  - The `tags` column on the `role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "plan" DROP COLUMN "features";

-- AlterTable
ALTER TABLE "role" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
