import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-2xl font-bold">404 - الصفحة غير موجودة</h2>
      <p className="text-gray-600">لم يتم العثور على المورد المطلوب.</p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
