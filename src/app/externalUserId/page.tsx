"use client";

import { useState, useMemo } from "react";
import IframeFetcher from "../components/IframeFetcher";

const USERS = [
  { id: "user-alice-123", label: "Alice" },
  { id: "user-bob-456", label: "Bob" },
];

const ExternalUserIdPage = () => {
  const org = "rilldata";
  const project = "rill-embed";
  const [selectedUser, setSelectedUser] = useState(USERS[0]);

  const iframeBody = useMemo(
    () => ({
      resource: "embed_explore",
      navigation: true,
      external_user_id: selectedUser.id,
    }),
    [selectedUser.id],
  );

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Per-User State</h2>
      <p className="text-gray-600 mb-6">
        By passing an{" "}
        <code className="bg-gray-100 text-gray-800 px-1 rounded">
          external_user_id
        </code>{" "}
        parameter in the iframe request body, each user gets their own
        persistent state. This is currently only used for AI chat history,
        allowing previous conversations to be accessed across embed sessions.
      </p>
      <p className="text-gray-600 mb-6">
        Try switching between users below. Each user will have their own
        independent AI chat history. Open the AI chat in the embedded dashboard,
        send a message, then switch users to see that the conversation is scoped
        to the selected user.
      </p>

      {/* User Selector */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Select a user:
        </h3>
        <div className="flex gap-3">
          {USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedUser.id === user.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {user.label}
              <span className="ml-2 text-xs opacity-75">({user.id})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Request body:
        </h3>
        <div className="bg-gray-100 p-3 rounded font-mono text-sm">
          {JSON.stringify(iframeBody)}
        </div>
      </div>

      <div className="mb-8">
        <IframeFetcher
          key={selectedUser.id}
          org={org}
          project={project}
          body={iframeBody}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Related Links:
      </h3>
      <ul className="space-y-2">
        <li>
          <a
            href="https://docs.rilldata.com/integrate/embedding"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Embedding Documentation
          </a>
        </li>
        <li>
          <a
            href="https://github.com/rilldata/rill-embedding-example/blob/main/src/app/api/get-iframe/route.tsx"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Iframe Code
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ExternalUserIdPage;
