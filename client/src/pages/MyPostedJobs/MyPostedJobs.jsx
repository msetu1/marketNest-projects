import { useEffect, useState } from "react";
import useUsers from "../../hooks/useUsers";

import MyPostedJobCard from "../../components/MyPostedJobCard/MyPostedJobCard";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const MyPostedJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useUsers();
  const [jobs, setJobs] = useState([]);

  // my posted jobs
  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    const { data } = await axiosSecure(`/jobs/${user?.email}`);
    setJobs(data);
  };

  // my posted jobs deleted
  const handleDeletedJob = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/jobDeleted/${id}`);
      console.log(data);

      toast.success("delete successfully");
      // refresh data
      getData();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <section className="container px-4 mx-auto pt-12 mb-20">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">My Posted Jobs</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {jobs.length}
        </span>
      </div>
      {jobs?.length === 0 ? (
        <div className="max-w-7xl flex items-center justify-center mx-auto h-[80vh]">
          <img
            className="h-full"
            src="https://i.ibb.co/3FVgSYq/3009287.jpg"
            alt=""
          />
        </div>
      ) : (
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <span>Deadline</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Price Range</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Description
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {jobs?.map((job) => (
                      <MyPostedJobCard
                        key={job._id}
                        job={job}
                        handleDeletedJob={handleDeletedJob}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyPostedJobs;
