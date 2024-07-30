-- CreateTable
CREATE TABLE `_PupilToSubject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PupilToSubject_AB_unique`(`A`, `B`),
    INDEX `_PupilToSubject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PupilToSubject` ADD CONSTRAINT `_PupilToSubject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pupil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PupilToSubject` ADD CONSTRAINT `_PupilToSubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
