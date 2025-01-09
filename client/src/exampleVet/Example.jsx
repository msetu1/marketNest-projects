import { useEffect, useState } from "react";
import Button from "../../../Components/UI/Button";
import PrimaryTitle from "../../../Components/UI/PrimaryTitle";
import NewServiceForm from "./NewServiceForm";
import Modal from "../../../Components/UI/Modal";
import MyServicesRow from "./MyServicesRow";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import MyServiceUpdate from "./MyServiceUpdate";

const MyServices = () => {
  const apiHandler = useAxios();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null); 
  // modal
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");

  //  show service
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiHandler.get("/vetServices"); // Replace with your API endpoint
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // services delete
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
            // Remove the deleted service from the state
            setServices((prevServices) =>
              prevServices.filter((service) => service._id !== id)
            );
          }
        });
      }
    });
  };

  // handle add modal
  const handleAddServices = () => {
    setModalType("add-service");
    setOpenModal(true);
  };

   // Open edit service modal and set selected service
   const handleEditService = (service) => {
    setSelectedService(service);
    setModalType("edit-service");
    setOpenModal(true);
  };

  // Update service in the state
  const updateServiceInState = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === updatedService._id ? updatedService : service
      )
    );
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

      {/* table section  */}
      <div className="custom-scrollbar h-[80vh] overflow-y-auto shadow-myCustomShadow bg-white rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="p-4 font-semibold">#</th>
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Vet Name</th>
              <th className="p-4 font-semibold">Service Email</th>
              <th className="p-4 font-semibold">Service Type</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-myGray">
            {services.map((service, index) => (
              <MyServicesRow
                key={index}
                index={index}
                service={service}
                handleDeleteService={handleDeleteService}
                handleEditService={handleEditService}
              ></MyServicesRow>
            ))}
          </tbody>
        </table>
      </div>
      {openModal && (
        <Modal primary={true} openModal={openModal} setOpenModal={setOpenModal}>
          {/* <NewServiceForm onClose={() => setOpenModal(false)} /> */}
          {modalType === "add-service" && (
            <NewServiceForm onClose={() => setOpenModal(false)} />
          )}
          {modalType === "edit-service" && (
            <MyServiceUpdate onClose={() => setOpenModal(false)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default MyServices;
