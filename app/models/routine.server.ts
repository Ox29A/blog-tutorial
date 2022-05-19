import type { User, Routine } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Routine } from "@prisma/client";

export function getRoutine({
  id,
  authorId,
}: Pick<Routine, "id"> & {
  authorId: User["id"];
}) {
  return prisma.routine.findFirst({
    where: { id, authorId },
    include: {
      author: true, // Return all fields
    }
  });
}

export function getRoutineListItems({ authorId }: { authorId: User["id"] }) {
  return prisma.routine.findMany({
    where: { authorId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createRoutine({
  description,
  name,
  authorId,
}: Pick<Routine, "description" | "name"> & {
  authorId: User["id"];
}) {
  return prisma.routine.create({
    data: {
      name,
      description,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
}

export function deleteRoutine({
  id,
  authorId,
}: Pick<Routine, "id"> & { authorId: User["id"] }) {
  return prisma.routine.deleteMany({
    where: { id, authorId },
  });
}
