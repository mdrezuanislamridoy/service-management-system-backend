-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'SSLCOMMERZ', 'STRIPE');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH';

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "availability" SET DEFAULT true;
