/*
  Warnings:

  - You are about to drop the `_LeadToLeadService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LeadToLeadService";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_LeadServices" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LeadServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LeadServices_B_fkey" FOREIGN KEY ("B") REFERENCES "LeadService" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_LeadServices_AB_unique" ON "_LeadServices"("A", "B");

-- CreateIndex
CREATE INDEX "_LeadServices_B_index" ON "_LeadServices"("B");
