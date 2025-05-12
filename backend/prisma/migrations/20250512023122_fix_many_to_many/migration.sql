/*
  Warnings:

  - The primary key for the `Lead` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `leadId` on the `LeadService` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `LeadService` table. All the data in the column will be lost.
  - Added the required column `name` to the `LeadService` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_LeadToLeadService" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LeadToLeadService_A_fkey" FOREIGN KEY ("A") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LeadToLeadService_B_fkey" FOREIGN KEY ("B") REFERENCES "LeadService" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Lead" ("createdAt", "email", "id", "mobile", "name", "postcode") SELECT "createdAt", "email", "id", "mobile", "name", "postcode" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE TABLE "new_LeadService" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_LeadService" ("id") SELECT "id" FROM "LeadService";
DROP TABLE "LeadService";
ALTER TABLE "new_LeadService" RENAME TO "LeadService";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_LeadToLeadService_AB_unique" ON "_LeadToLeadService"("A", "B");

-- CreateIndex
CREATE INDEX "_LeadToLeadService_B_index" ON "_LeadToLeadService"("B");
