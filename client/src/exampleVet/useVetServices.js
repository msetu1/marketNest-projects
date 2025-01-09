import { useEffect, useState } from "react";
import useAxios from "../useAxios";

const useVetServices = (email) => {
  const [vetServices, setVetServices] = useState([]);
  const apiHandler = useAxios();
  const fetchVetServices = async () => {
    try {
      const response = await apiHandler.get("/vetServices");
      const allServices = response?.data || [];

      // Filter services based on email if provided
      if (email) {
        const filteredServices = allServices?.filter(
          (service) => service?.email === email
        );
        setVetServices(filteredServices);
      } else {
        setVetServices(allServices);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchVetServices();
  }, []); // Dependency to re-fetch if the email prop changes

  return { vetServices };
};

export default useVetServices;
