import { FiHome, FiMail, FiShield, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const isOwner = user?.role === "owner" || user?.role === "admin";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Account
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-950">Profile</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-md bg-slate-950 text-2xl font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                {user?.name}
              </h2>
              <p className="mt-1 text-sm capitalize text-slate-500">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-4">
              <FiUser className="text-slate-500" />
              <p className="mt-3 text-sm text-slate-500">Full name</p>
              <p className="mt-1 font-semibold text-slate-950">{user?.name}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <FiMail className="text-slate-500" />
              <p className="mt-3 text-sm text-slate-500">Email</p>
              <p className="mt-1 break-all font-semibold text-slate-950">
                {user?.email}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <FiShield className="text-slate-500" />
              <p className="mt-3 text-sm text-slate-500">Access</p>
              <p className="mt-1 font-semibold capitalize text-slate-950">
                {user?.role}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <FiHome className="text-slate-500" />
              <p className="mt-3 text-sm text-slate-500">Workspace</p>
              <p className="mt-1 font-semibold text-slate-950">
                {isOwner ? "Owner dashboard" : "Buyer profile"}
              </p>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Quick actions</h2>
          <div className="mt-5 space-y-3">
            <Link
              to="/properties"
              className="block rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700"
            >
              Browse properties
            </Link>
            {isOwner && (
              <>
                <Link
                  to="/owner/add-property"
                  className="block rounded-md bg-slate-950 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Add property
                </Link>
                <Link
                  to="/owner/my-properties"
                  className="block rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700"
                >
                  Manage listings
                </Link>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
