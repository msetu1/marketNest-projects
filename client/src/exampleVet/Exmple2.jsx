import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { useForm } from "react-hook-form";
const serviceType = [
    "Holistics",
    "SportsCare",
    "OncoCare",
    "Genetics",
    "Medical Care",
  ];
const MyServiceUpdate = () => {
    const apiHandler = useAxios();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
        defaultValues: {
          vetName: service.vetName,
          vetEmail: service.vetEmail,
          serviceName: service.serviceName,
          serviceType: service.serviceType,
          shortDescription: service.shortDescription,
          description: service.description,
        },
      });
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const onSubmit = async (data) => {


    }


     // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await apiHandler.post(
          `https://api.imgbb.com/1/upload?key=597d78aa1ab369b0aa1583848b74f0f9`,
          formData
        );
        setImagePreview(response.data.data.url);
        setImageUrl(response.data.data.url);
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };
    return (
        <div className="w-[80%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* row-1  */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 mb-6">
            {/* Name Field */}
            <div className="flex-1">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700"
              >
                Vet Name
              </label>
              <input
                {...register("vetName", { required: "This field is required" })}
                type="text"
                placeholder="Enter blog title"
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
              {errors.vetName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.vetName.message}
                </p>
              )}
            </div>
            {/* email Field */}
            <div className="flex-1">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700"
              >
                Vet Email
              </label>
              <input
                {...register("vetEmail", { required: "This field is required" })}
                type="email"
                placeholder="Enter blog title"
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
              {errors.vetEmail && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.vetEmail.message}
                </p>
              )}
            </div>
          </div>
          {/* row-2  */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 mb-6">
            {/* Name Field */}
            <div className="flex-1">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700"
              >
                Service Name
              </label>
              <input
                {...register("serviceName", {
                  required: "This field is required",
                })}
                type="text"
                placeholder="Enter blog title"
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
              {errors.serviceName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.serviceName.message}
                </p>
              )}
            </div>
  
            {/* Category Field */}
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-700"
              >
                Service Type
              </label>
              <select
                {...register("serviceType", {
                  required: "Please select a Type",
                })}
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              >
                <option value="">Select Type</option>
                {serviceType?.map((item, idx) => (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.serviceType.message}
                </p>
              )}
            </div>
          </div>
          {/* img uploading  */}
          <div className="mb-6 flex flex-col items-start">
            <label
              htmlFor="image"
              className="text-lg font-medium text-gray-700 mb-2"
            >
              Upload Service Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="py-10 w-full text-sm  border-dashed border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-4 max-w-xs max-h-48 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
  
          {/* short des  */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Short Description
            </label>
            <textarea
              {...register("shortDescription", {
                required: "This field is required",
              })}
              placeholder="Write a detailed description for your blog"
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 h-[80px]"
              rows="5"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-2">
                {errors.shortDescription.message}
              </p>
            )}
          </div>
          {/* description  */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              {...register("description", {
                required: "This field is required",
              })}
              placeholder="Write a detailed description for your blog"
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              rows="5"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2">
                {errors.description.message}
              </p>
            )}
          </div>
  
          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg focus:outline-none transition duration-300"
            >
              Update Service
            </button>
          </div>
        </form>
      </div>
    );
};

export default MyServiceUpdate;