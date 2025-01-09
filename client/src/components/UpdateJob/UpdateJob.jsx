import { useState } from "react";
import DatePicker from "react-datepicker";
import useUsers from "../../hooks/useUsers";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateJob = ({job}) => {
    const {user}=useUsers()
    const navigate = useNavigate();
const [startDate, setStartDate] = useState(new Date(job?.deadline));


//   job updated 
  const handleUpdate=async(e)=>{
    e.preventDefault();
    const from = e.target;

    const job_title = from.job_title.value;
    const email = from.email.value;
    const description = from.description.value;
    const min_price = from.min_price.value;
    const max_price = from.max_price.value;
    const category = from.category.value;
    const deadline = startDate;

    const jobData = {
      job_title,
      description,
      min_price,
      max_price,
      deadline,
      category,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };
    console.log(jobData);

    try {
      const { data } = await axios.put(`http://localhost:9000/job/${job?._id}`, jobData);
      console.log(data);
      toast.success(`job data updated successfully`);
      navigate("/my-posted-job");
    } catch (err) {
      toast.error(err?.message);
    }

  }



  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <button
        onClick={toggleModal}
        className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleModal}
        ></div>

        {/* Modal box */}
        <div
          className={`relative w-full max-w-4xl bg-white rounded-lg shadow transform transition-transform duration-300 ${
            isModalOpen ? "scale-100" : "scale-75"
          }`}
        >
          {/* Modal content */}
          <div className="relative rounded-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              <form onSubmit={handleUpdate}>
                <h2 className="text-lg font-semibold text-gray-700 capitalize ">
                  Update a Job
                </h2>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 " htmlFor="job_title">
                      Job Title
                    </label>
                    <input
                      id="job_title"
                      name="job_title"
                      type="text"
                      defaultValue={job?.job_title}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 " htmlFor="emailAddress">
                      Email Address
                    </label>
                    <input
                      id="emailAddress"
                      type="email"
                      name="email"
                        defaultValue={job?.buyer?.email}
                      disabled
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700">Deadline</label>
                    <DatePicker
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    {/* Date picker input field */}
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700 " htmlFor="category">
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      defaultValue={job?.category}
                      className="border p-2 rounded-md"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Graphics Design">Graphics Design</option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-700 " htmlFor="min_price">
                      Minimum Price
                    </label>
                    <input
                      id="min_price"
                      name="min_price"
                      defaultValue={job?.min_price}
                      type="number"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 " htmlFor="max_price">
                      Maximum Price
                    </label>
                    <input
                      id="max_price"
                      name="max_price"
                      defaultValue={job?.max_price}
                      type="number"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <label className="text-gray-700 " htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    name="description"
                    id="description"
                    defaultValue={job?.description}
                    cols="30"
                  ></textarea>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
