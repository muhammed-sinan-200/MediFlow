import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion } from "framer-motion";
import PageLoader from "../../components/PageLoader";

const DoctorsList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadDoctors = async () => {
      setLoading(true);
      await getAllDoctors();
      if (active) setLoading(false);
    };

    loadDoctors();

    return () => {
      active = false;
    };
  }, [aToken]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="m-5 max-h-[90vh] overflow-y-scroll px-4 py-5"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-3 text-lg font-medium text-purple-950"
      >
        All Doctors
      </motion.h1>

      {loading ? (
        <PageLoader label="Loading doctors..." />
      ) : doctors.length === 0 ? (
        <div className="mt-8 rounded border border-dashed border-purple-200 bg-purple-50/60 px-4 py-12 text-center">
          <p className="text-base font-semibold text-purple-900">
            No doctors found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Add a doctor to see them listed here.
          </p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6">
          {doctors.map((item, index) => (
            <div
              key={index}
              className="border border-purple-200 rounded-xl overflow-hidden cursor-pointer group w-full"
            >
              <img
                className="w-full object-cover group-hover:bg-purple-100 transition-all duration-300"
                src={item.image}
                alt=""
              />

              <div className="p-4">
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm">{item.speciality}</p>

                <div className="flex items-center gap-1 mt-2 text-sm">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default DoctorsList;
