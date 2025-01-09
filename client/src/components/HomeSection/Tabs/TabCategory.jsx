import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "../../JobCard/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";
const TabCategory = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`http://localhost:9000/jobs`);
      setJobs(data);
    };
    getData();
  }, []);

  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <div className="mb-10 text-center">
          <h2 className="font-bold text-3xl mb-3">Brows job categories</h2>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            excepturi!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mt-8 lg:mt-16">
            {jobs
              ?.filter((j) => j.category === "Web Development")
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mt-8 lg:mt-16">
            {jobs
              ?.filter((j) => j.category === "Graphics Design")
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mt-8 lg:mt-16">
            {jobs
              ?.filter((j) => j.category === "Digital Marketing")
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategory;
