import PrimaryTitle from "../../../Components/UI/PrimaryTitle";
import { FaTrash, FaEdit } from "react-icons/fa";
import useVetServices from "../../../Hooks/api/useVetServices";
import { useState } from "react";
import Modal from "../../../Components/UI/Modal";
import ServiceModalContent from "../../../Components/Dashboard/Admin/MyServices/ServiceModalContent";
import Button from "../../../Components/UI/Button";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import NewServiceForm from "./NewServiceForm";

const MyServices = () => {
  const apiHandler = useAxios();
  const [selectedVetService, setSelectedVetService] = useState(null); // State for selected vet
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const email = "sarah.parker@vetclinic.com"; // Replace with the desired email
  const { vetServices } = useVetServices(email);


  const handleEditService = (service) => {
    setSelectedVetService(service);
    setModalType("edit-service");
    setOpenModal(true);
  };

  // deleted service 
  const handleDeleteService = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiHandler.delete(`/vetServices/${id}`).then((result) => {
          if (result?.data?.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleAddServices = () => {
    setModalType("add-service");
    setOpenModal(true);

  };

  return (
    <div className="p-8 font-inter">
      <div className="flex justify-between items-center">
        <PrimaryTitle titleStyle="text-primaryBold font-semibold">
          My Services
        </PrimaryTitle>
        <Button onClick={handleAddServices} secondary>
          Add Service
        </Button>
      </div>

      <div className="custom-scrollbar h-[80vh] overflow-y-auto shadow-myCustomShadow bg-white rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="p-4 font-semibold">#</th>
              <th className="p-4 font-semibold">Vet Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Service Type</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-myGray">
            {vetServices?.map((service, index) => (
              <tr
                key={service?._id}
                className={`${
                  index % 2 === 0 ? "bg-primaryLight bg-opacity-10" : "bg-white"
                }`}
              >
                <td className="p-4 font-medium">{index + 1}</td>
                <td className="p-4 font-medium">{service?.vetName}</td>
                <td className="p-4">{service?.email}</td>
                <td className="p-4">{service?.serviceType}</td>
                <td className="p-4">{service?.price}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEditService(service?.id)}
                    className="p-2 text-white bg-secondary rounded-full hover:bg-primary transition duration-150"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-150"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render the details modal */}
      {openModal && (
        <Modal primary={true} openModal={openModal} setOpenModal={setOpenModal}>
          {modalType === "add-service" && <NewServiceForm />}
          {modalType === "edit-service" && (
            <ServiceModalContent selectedVetService={selectedVetService} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default MyServices;
