-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY['en', 'tr']::TEXT[];
