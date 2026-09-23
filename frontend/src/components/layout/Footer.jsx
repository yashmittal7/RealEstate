export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; 2026 EstateHub. Built for serious property decisions.</p>
        <div className="flex gap-4">
          <span>Buy</span>
          <span>Rent</span>
          <span>List</span>
        </div>
      </div>
    </footer>
  );
}
