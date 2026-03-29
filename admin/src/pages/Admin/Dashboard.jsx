import React, { useContext, useEffect, useMemo } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Users,
  CalendarDays,
  IndianRupee,
  Activity,
  ArrowUpDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  const stats = useMemo(() => {
    const latest = dashData?.latestAppointments || [];

    const completed = latest.filter((a) => a.isComplete).length;
    const cancelled = latest.filter((a) => a.cancelled).length;
    const pending = latest.filter((a) => !a.isComplete && !a.cancelled).length;

    const revenue = latest
      .filter((a) => a.payment && !a.cancelled)
      .reduce((sum, a) => sum + (a.amount || 0), 0);

    const statusData = [
      { name: "Completed", value: completed, color: "#10b981" },
      { name: "Pending", value: pending, color: "#f59e0b" },
      { name: "Cancelled", value: cancelled, color: "#f43f5e" },
    ];

    return {
      latest,
      completed,
      cancelled,
      pending,
      revenue,
      statusData,
    };
  }, [dashData]);

  const recentThreeAppointments = useMemo(() => {
    const latest = dashData?.latestAppointments || [];
    return latest.slice(0, 3);
  }, [dashData]);

  if (!dashData) return null;

  const summaryItems = [
    {
      title: "Doctors",
      value: dashData.doctors,
      icon: Stethoscope,
      textColor: "text-violet-700",
      bg: "bg-violet-50",
      iconBg: "bg-violet-100",
    },
    {
      title: "Patients",
      value: dashData.patients,
      icon: Users,
      textColor: "text-sky-700",
      bg: "bg-sky-50",
      iconBg: "bg-sky-100",
    },
    {
      title: "Appointments",
      value: dashData.appointments,
      icon: CalendarDays,
      textColor: "text-emerald-700",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: IndianRupee,
      textColor: "text-amber-700",
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full min-h-[calc(100vh-73px)] bg-gradient-to-br from-slate-50 via-[#faf7ff] to-slate-100 p-4 sm:p-5 lg:p-6"
    >
      <div className="mb-5">
        <p className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs sm:text-sm font-medium text-violet-700">
          Mediflow Admin Overview
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track platform activity, payments, and appointment status.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8 space-y-5">
          <div className="rounded border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              Appointment Status
            </h3>

            <div className="mt-4 flex flex-col items-center">
              <div className="h-44 w-44 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.statusData}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {stats.statusData.map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="text-xl font-bold text-slate-900">
                    {stats.completed + stats.pending + stats.cancelled}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 w-full text-center">
                {stats.statusData.map((item, index) => (
                  <div key={index}>
                    <p className="text-xs text-slate-500">{item.name}</p>
                    <p className="text-sm font-bold" style={{ color: item.color }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Recent Appointments
                </h3>
                <p className="text-sm text-slate-500">
                  Showing only the latest 3 appointments
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ArrowUpDown size={16} />
                <span>Latest 3</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {recentThreeAppointments.length > 0 ? (
                recentThreeAppointments.map((item) => (
                  <div
                    key={item._id}
                    className="rounded border border-slate-200 p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="flex min-w-0 items-center gap-3 sm:w-[48%]">
                            <img
                              src={item.userData?.image}
                              alt={item.userData?.name}
                              className="h-12 w-12 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Patient
                              </p>
                              <p className="truncate text-sm sm:text-base font-semibold text-slate-900">
                                {item.userData?.name}
                              </p>
                            </div>
                          </div>

                          <div className="flex min-w-0 items-center gap-3 sm:w-[52%]">
                            <img
                              src={item.docData?.image}
                              alt={item.docData?.name}
                              className="h-12 w-12 rounded-full object-cover border border-slate-200 bg-purple-50 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Doctor
                              </p>
                              <p className="truncate text-sm sm:text-base font-semibold text-slate-900">
                                {item.docData?.name}
                              </p>
                              <p className="truncate text-xs sm:text-sm text-slate-500">
                                {item.docData?.speciality || "Speciality not available"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            {item.slotDate} • {item.slotTime}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            ₹{item.amount}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              item.cancelled
                                ? "bg-rose-50 text-rose-700"
                                : item.isComplete
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {item.cancelled
                              ? "Cancelled"
                              : item.isComplete
                              ? "Completed"
                              : "Pending"}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              item.payment
                                ? "bg-blue-50 text-blue-700"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {item.payment ? "Paid" : "Unpaid"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  No recent appointments found.
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={() => navigate("/all-appointments")}
                className="rounded bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
              >
                More
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-5">
          <div className="rounded border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
            <p className="mt-1 text-sm text-slate-500">
              Core platform numbers at a glance
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {summaryItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`${item.bg} rounded p-3 border border-slate-100 min-w-0 overflow-hidden`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs sm:text-sm font-medium text-slate-500 leading-snug break-words pr-1">
                        {item.title}
                      </p>
                      <div
                        className={`rounded p-1.5 sm:p-2 ${item.iconBg} shrink-0`}
                      >
                        <Icon size={15} className={item.textColor} />
                      </div>
                    </div>

                    <p className="mt-3 text-base sm:text-lg font-bold text-slate-900 break-words leading-tight">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Quick Insights
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Small operational snapshot
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-white p-2 shadow-sm">
                    <Activity className="text-slate-700" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Recent Bookings</p>
                    <p className="text-xl font-bold text-slate-900">
                      {stats.latest.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded bg-slate-50 p-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">Completion Rate</p>
                <p className="font-bold text-slate-900">
                  {stats.latest.length
                    ? `${Math.round((stats.completed / stats.latest.length) * 100)}%`
                    : "0%"}
                </p>
              </div>

              <div className="rounded bg-slate-50 p-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">Cancellation Rate</p>
                <p className="font-bold text-slate-900">
                  {stats.latest.length
                    ? `${Math.round((stats.cancelled / stats.latest.length) * 100)}%`
                    : "0%"}
                </p>
              </div>

              <div className="rounded bg-slate-50 p-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">Pending Follow-up</p>
                <p className="font-bold text-slate-900">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;