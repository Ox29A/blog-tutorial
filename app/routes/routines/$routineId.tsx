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
  routine: Routine | any;
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

export default function RoutineDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      {/* Create a flexbox container that shows our routine name and description then lets us add scenarios */}
      <h3 className="text-2xl font-bold">
        Routine Details - {data.routine.name}
      </h3>
      <p className="py-6">
        <span className="font-bold">Description: </span>
        {data.routine.description}
      </p>
      <hr className="my-2" />
      {/* List scenarios if any */}
      {
        <div>
          <h4 className="text-2xl font-bold">Scenarios</h4>
          <ul className="list-disc list-inside">
            <li key="test-1" className="">
              <a href={`/routines/routineId/scenarios/scenarioId`}>
                Scenario Name goes here
              </a>
            </li>
            <li key="test-2" className="">
              <a href={`/routines/routineId/scenarios/scenarioId`}>
                Scenario Name goes here
              </a>
            </li>
            <li key="test-3" className="">
              <a href={`/routines/routineId/scenarios/scenarioId`}>
                Scenario Name goes here
              </a>
            </li>
            <li key="test-4" className="">
              <a href={`/routines/routineId/scenarios/scenarioId`}>
                Scenario Name goes here
              </a>
            </li>
            {/* {data.routine.scenarios.map((scenario) => (
              <li key={scenario.id}>
                <a
                  href={`/routines/${data.routine.id}/scenarios/${scenario.id}`}
                >
                  {scenario.name}
                </a>
              </li>
            ))} */}
          </ul>
        </div>
      }
      ;{/* Create a form that lets us add scenarios */}
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Add Scenario
        </button>
      </Form>
      {/* <h3 className="text-2xl font-bold">{data.routine.name}</h3>
      <p className="py-6">{data.routine.description}</p> */}
      {/* Show author at bottom of card */}
      {/* Display author name here for us to use */}
      {/* <p>{data.routine.author?.email}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form> */}
    </div>
  );
}
