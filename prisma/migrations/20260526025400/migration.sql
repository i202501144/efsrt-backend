-- AlterTable
ALTER TABLE "GameHistory" ADD COLUMN     "isWin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prize" TEXT;

-- AlterTable
ALTER TABLE "Raffle" ADD COLUMN     "winnerId" TEXT;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
