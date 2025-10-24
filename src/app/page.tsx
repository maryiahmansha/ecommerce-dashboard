// // import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';

// export default function HomePage() {
//   //   const session = await getServerSession();
//   // if (!session) {
//   //     redirect("/auth/login")
//   // }

//   redirect('/dashboard');
// }

export default function Page() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-yellow-400">Dark Mode Test 🌙</h1>
      <p className="text-gray-700 dark:text-gray-300">Toggle theme to test</p>
    </div>
  );
}
