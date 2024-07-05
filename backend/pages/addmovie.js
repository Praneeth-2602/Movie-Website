import Movie from '@/components/Movie';
import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';

export default function Addmovie() {

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    router.push('/auth');
    return null;  // return null or any loading indicator while redirecting
  }
  if (session) {
    return <>
      <div className="addbblogpage container">
        <div className="blogsadd">
          <div className="titledashboard w-100 flex flex-sb">
            <div>
              <h2>Add Movie</h2>
              <h3>Admin Panel</h3>
            </div>
          </div>
          <Movie />
        </div>
      </div>
    </>
  }
}