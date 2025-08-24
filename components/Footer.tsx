export function Footer() {
  return (
    <footer className="w-full py-4 px-6 mt-auto border-t border-gray-200">
      <div className="max-w-4xl justify-center items-center mx-auto w-full flex">
        <div className="text-sm text-gray-600 font-medium">
          © {new Date().getFullYear()} Folio.me. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
