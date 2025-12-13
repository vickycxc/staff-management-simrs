// src/constants/data.js

export const JOB_CATEGORIES = {
    MEDIS: ['Dokter Spesialis', 'Dokter Umum', 'Dokter Gigi'],
    KEPERAWATAN: ['Perawat', 'Bidan'],
    PENUNJANG: ['Farmasi', 'Laboratorium', 'Radiologi', 'Gizi', 'Fisioterapi', 'Rekam Medis'],
    NON_MEDIS: ['Manajemen & Admin', 'Keuangan', 'IT & SIMRS', 'Teknik (IPSRS)', 'Keamanan', 'Layanan Umum']
};

export const WORK_UNITS = [
    "Instalasi Gawat Darurat (IGD)", "Instalasi Rawat Jalan (Poliklinik)", "Instalasi Rawat Inap",
    "Intensive Care Unit (ICU / ICCU / NICU)", "Kamar Operasi (IBS)", "Kamar Bersalin (VK)",
    "Instalasi Farmasi", "Laboratorium", "Radiologi", "Rehabilitasi Medik", "Instalasi Gizi",
    "Rekam Medis", "Manajemen & Administrasi", "Keuangan & Akuntansi", "IT & SIMRS",
    "SDM & Diklat", "IPSRS (Teknik & Pemeliharaan)", "Keamanan & Ketertiban",
    "Front Office & Pendaftaran", "Sanitasi & Laundry"
];

export const REQUIRED_SIP_DOCS = [
    ...JOB_CATEGORIES.MEDIS, ...JOB_CATEGORIES.KEPERAWATAN, ...JOB_CATEGORIES.PENUNJANG
];

export const INITIAL_DATA = [
    { 
        id: 1, employeeId: "199001012018011001", name: "dr. Andi Pratama, Sp.PD-KGEH", role: "Spesialis Penyakit Dalam", unit: "Instalasi Rawat Jalan (Poliklinik)",
        category: "Dokter Spesialis", employeeType: "Mitra", joinDate: "2018-05-12", 
        sipNumber: "503/SIP/2018", sipExpiry: "2024-04-01", 
        currentShift: "Pagi", performance: [85, 90, 88], skpPoints: 25, status: "Active",
        gender: "Laki-laki", birthPlace: "Jakarta", birthDate: "1990-01-01", 
        phone: "0812-3456-7890", email: "andi.pratama@rs.com", address: "Jl. Menteng Raya No. 10, Jakarta Pusat",
        kpi: [], behavior: [], discipline: [], training: [], skp: { target: 50, realization: 25, grade: "Baik" }
    },
    { 
        id: 2, employeeId: "199505052022021002", name: "dr. Kevin Sanjaya", role: "Dokter Jaga IGD", unit: "Instalasi Gawat Darurat (IGD)",
        category: "Dokter Umum", employeeType: "Kontrak", joinDate: "2022-01-15", 
        sipNumber: "789/SIP/2022", sipExpiry: "2026-01-15",
        currentShift: "Malam", performance: [80, 85, 87], skpPoints: 10, status: "Active",
         gender: "Laki-laki", birthPlace: "Bandung", birthDate: "1995-05-05", 
         phone: "0811-2233-4455", email: "kevin.s@rs.com", address: "Jl. Dago Atas No. 55, Bandung",
        kpi: [], behavior: [], discipline: [], training: [], skp: { target: 50, realization: 10, grade: "Cukup" }
    },
    // ... data lainnya
];