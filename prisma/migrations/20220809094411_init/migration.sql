-- CreateTable
CREATE TABLE "BatteryPost" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bikes" INTEGER NOT NULL,

    CONSTRAINT "BatteryPost_pkey" PRIMARY KEY ("id")
);
