import { useState } from "react";
import {
  AlertTriangle,
  ChevronRight,
  Stethoscope,
  Users,
  Activity,
  Shield,
  Sun,
  Cloud,
  Moon,
  CheckCircle,
} from "lucide-react";

/* ======================
   DUMMY CONSTANT
====================== */
const JOB_CATEGORIES = {
  MEDIS: ["Dokter"],
  KEPERAWATAN: ["Perawat", "Bidan"],
  PENUNJANG: ["Laboratorium", "Farmasi"],
  NON_MEDIS: ["Administrasi", "Keamanan"],
};

/* ======================
   DUMMY COMPONENTS
====================== */
const WidgetCard = ({ title, count, icon: Icon, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-gray-800 p-4 rounded-xl border cursor-pointer hover:shadow"
  >
    <div className="flex items-center gap-3">
      <Icon size={28} />
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose}>✖</button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ======================
   MAIN COMPONENT
====================== */
export default function DashboardPage({ staffData = [] }) {
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    list: [],
  });
  const [showSipModal, setShowSipModal] = useState(false);

  const getSipWarnings = () => {
    const today = new Date();
    return staffData
      .map((staff) => {
        if (!staff.sipExpiry) return null;
        const diffDays =
          (new Date(staff.sipExpiry) - today) / (1000 * 60 * 60 * 24);
        if (diffDays <= 0) return null;
        if (diffDays <= 180) {
          return { ...staff, daysLeft: Math.ceil(diffDays) };
        }
        return null;
      })
      .filter(Boolean);
  };

  const warningList = getSipWarnings();

  const getStaffByCategory = (cats) =>
    staffData.filter((s) => cats.includes(s.category));

  const openListModal = (title, list) =>
    setModalData({ isOpen: true, title, list });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Operasional SDM</h1>

      {warningList.length > 0 && (
        <div
          onClick={() => setShowSipModal(true)}
          className="p-4 bg-red-100 rounded-xl cursor-pointer flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle />
            <span>{warningList.length} SIP perlu perhatian</span>
          </div>
          <ChevronRight />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard
          title="Dokter"
          count={getStaffByCategory(JOB_CATEGORIES.MEDIS).length}
          icon={Stethoscope}
          onClick={() =>
            openListModal(
              "Daftar Dokter",
              getStaffByCategory(JOB_CATEGORIES.MEDIS)
            )
          }
        />
        <WidgetCard
          title="Perawat"
          count={getStaffByCategory(JOB_CATEGORIES.KEPERAWATAN).length}
          icon={Users}
          onClick={() =>
            openListModal(
              "Daftar Perawat",
              getStaffByCategory(JOB_CATEGORIES.KEPERAWATAN)
            )
          }
        />
        <WidgetCard
          title="Penunjang"
          count={getStaffByCategory(JOB_CATEGORIES.PENUNJANG).length}
          icon={Activity}
        />
        <WidgetCard
          title="Non Medis"
          count={getStaffByCategory(JOB_CATEGORIES.NON_MEDIS).length}
          icon={Shield}
        />
      </div>

      <Modal
        isOpen={modalData.isOpen}
        title={modalData.title}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
      >
        <ul className="space-y-2">
          {modalData.list.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </Modal>

      <Modal
        isOpen={showSipModal}
        title="Peringatan SIP"
        onClose={() => setShowSipModal(false)}
      >
        <ul className="space-y-2">
          {warningList.map((s) => (
            <li key={s.id}>
              {s.name} — exp {s.sipExpiry}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
