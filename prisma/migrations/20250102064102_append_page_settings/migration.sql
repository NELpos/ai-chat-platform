-- CreateTable
CREATE TABLE "PageSettings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pageName" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageSettings" ADD CONSTRAINT "PageSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
