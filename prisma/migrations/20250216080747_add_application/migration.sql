-- CreateTable
CREATE TABLE "Application" (
    "applicationId" SERIAL NOT NULL,
    "num" TEXT NOT NULL,
    "n_raion" TEXT NOT NULL,
    "fio" TEXT NOT NULL,
    "years" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "kontrakt" TEXT NOT NULL,
    "nagrads" TEXT NOT NULL,
    "geom" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId")
);
