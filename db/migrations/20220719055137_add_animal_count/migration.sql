-- CreateTable
CREATE TABLE "AnimalCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "AnimalCount_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimalCount_animalId_key" ON "AnimalCount"("animalId");
