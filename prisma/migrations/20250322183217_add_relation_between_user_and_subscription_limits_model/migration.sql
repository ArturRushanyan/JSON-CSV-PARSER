-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionLimitsId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscriptionLimitsId_fkey" FOREIGN KEY ("subscriptionLimitsId") REFERENCES "SubscriptionLimits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
