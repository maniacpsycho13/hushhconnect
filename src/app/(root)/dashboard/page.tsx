
import Posts from "@/components/Post/Posts";
import { PostsSkeleton } from "@/components/Post/Skeletons";

import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

function DashboardPage() {
  return (
    <main className="flex w-full flex-grow ">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense fallback={<Loader />}>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}

export default DashboardPage;
