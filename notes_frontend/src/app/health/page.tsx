export const dynamic = "force-static";

export default function Health() {
  return (
    <pre className="p-6 text-sm text-gray-700">{JSON.stringify({ status: "ok" }, null, 2)}</pre>
  );
}
