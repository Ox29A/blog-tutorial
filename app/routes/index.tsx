import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="container mx-auto min-h-screen bg-white">
      {/* Create a centered title and description with a contact us button */}
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-bold leading-tight">
          <span className="text-green-700">LNC Joinery & Groundworks</span>
        </h1>
        <p className="mt-4 text-xl leading-relaxed">
          Here at LNC Joinery & Groundwork we pride ourselves in providing a
          professional service to all our customers, working with you throughout
          your project whether that be Joinery or Groundworks & consulting you
          along the way ensuring you are more than happy with everything
        </p>
        <button className="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-4xl text-white hover:bg-blue-700">
          Contact Us
        </button>
      </div>
    </main>
  );
}
