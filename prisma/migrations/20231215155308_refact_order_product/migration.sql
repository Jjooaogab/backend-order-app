/*
  Warnings:

  - You are about to drop the column `name` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qntd" INTEGER NOT NULL DEFAULT 1,
    "orderId" TEXT,
    CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrderProduct" ("id", "orderId", "qntd") SELECT "id", "orderId", "qntd" FROM "OrderProduct";
DROP TABLE "OrderProduct";
ALTER TABLE "new_OrderProduct" RENAME TO "OrderProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
