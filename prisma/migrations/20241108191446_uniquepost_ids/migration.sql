/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `LostFoundItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LostFoundItem_postId_key" ON "LostFoundItem"("postId");
