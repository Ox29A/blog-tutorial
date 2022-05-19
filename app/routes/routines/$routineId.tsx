import type { Routine } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { deleteRoutine, getRoutine } from "~/models/routine.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  routine: Routine | any
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.routineId, "routineId not found");

  const routine = await getRoutine({ authorId: userId, id: params.routineId });
  if (!routine) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ routine });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.routineId, "routineId not found");

  await deleteRoutine({ authorId: userId, id: params.routineId });

  return redirect("/routines");
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.routine.name}</h3>
      <p className="py-6">{data.routine.description}</p>
      {/* Show author at bottom of card */}
      {/* Display author name here for us to use */}
      <p>{data.routine.author?.email}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
