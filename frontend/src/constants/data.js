const JOB_CATEGORIES = {
    MEDIS: ['Dokter Spesialis', 'Dokter Umum', 'Dokter Gigi'],
    KEPERAWATAN: ['Perawat', 'Bidan'],
    PENUNJANG: ['Farmasi', 'Laboratorium', 'Radiologi', 'Gizi', 'Fisioterapi', 'Rekam Medis'],
    NON_MEDIS: ['Manajemen & Admin', 'Keuangan', 'IT & SIMRS', 'Teknik (IPSRS)', 'Keamanan', 'Layanan Umum']
};

const UNIT_MAPPING = {
    'Dokter Spesialis': [
        "Poli Penyakit Dalam", "Poli Bedah Umum", "Poli Anak", "Poli Kandungan (Obgyn)", 
        "Poli Mata", "Poli THT", "Poli Saraf", "Poli Jantung", "Poli Kulit & Kelamin",
        "Poli Kejiwaan", "Poli Rehabilitasi Medik", "Poli Orthopedi",
        "Rawat Inap Utama", "ICU / ICCU", "Kamar Operasi (IBS)"
    ],
    'Dokter Umum': ["Instalasi Gawat Darurat (IGD)", "Poli Umum", "Unit Medical Check Up (MCU)"],
    'Dokter Gigi': ["Poli Gigi & Mulut"],
    'Perawat': [
        "Instalasi Gawat Darurat (IGD)", "Rawat Inap (Lt 1)", "Rawat Inap (Lt 2)", "Rawat Inap (VIP)",
        "ICU / ICCU", "Kamar Operasi (IBS)", "Poli Umum", "Poli Spesialis", "Hemodialisa",
        "Poli Kejiwaan", "Poli Rehabilitasi Medik"
    ],
    'Bidan': ["Kamar Bersalin (VK)", "Poli Kandungan (Obgyn)", "Ruang Nifas"],
    'Farmasi': ["Instalasi Farmasi (Depot Rawat Jalan)", "Instalasi Farmasi (Depot Rawat Inap)", "Gudang Farmasi"],
    'Laboratorium': ["Laboratorium Patologi Klinik", "Laboratorium Patologi Anatomi", "Bank Darah"],
    'Radiologi': ["Instalasi Radiologi"],
    'Gizi': ["Instalasi Gizi (Dapur)", "Poli Gizi"],
    'Fisioterapi': ["Unit Rehabilitasi Medik"],
    'Rekam Medis': ["Unit Rekam Medis & Pendaftaran"],
    'Manajemen & Admin': ["Front Office", "Back Office", "HRD & Diklat", "Keuangan"],
    'Keuangan': ["Kasir", "Akuntansi"],
    'IT & SIMRS': ["Ruang Server & IT Support"],
    'Teknik (IPSRS)': ["Maintenance & Teknisi"],
    'Keamanan': ["Pos Security Utama", "Pos Security IGD", "Patroli"],
    'Layanan Umum': ["Cleaning Service", "Laundry", "Supir Ambulans", "Sanitasi & Kebersihan"]
};

const REQUIRED_SIP_DOCS = [
    ...JOB_CATEGORIES.MEDIS,
    ...JOB_CATEGORIES.KEPERAWATAN,
    ...JOB_CATEGORIES.PENUNJANG
];

const INITIAL_DATA = [
    { 
        id: 1, employeeId: "199001012018011001", name: "dr. Andi Pratama, Sp.PD-KGEH", role: "Spesialis Penyakit Dalam", unit: "Poli Penyakit Dalam",
        category: "Dokter Spesialis", employeeType: "Mitra", joinDate: "2018-05-12", 
        sipNumber: "503/SIP/2018", sipExpiry: "2024-04-01", 
        sipImage: "https://via.placeholder.com/600x400/17B8A5/ffffff?text=Scan+SIP+dr+Andi", 
        currentShift: "Pagi", performance: [85, 90, 88], skpPoints: 25, status: "Active",
        gender: "Laki-laki", birthPlace: "Jakarta", birthDate: "1990-01-01", 
        phone: "0812-3456-7890", email: "andi.pratama@rs.com", address: "Jl. Menteng Raya No. 10, Jakarta Pusat",
        kpi: [
            { indicator: "Respon Time Pasien Baru", target: "< 5 Menit", actual: "3 Menit", score: 95 },
            { indicator: "Kepuasan Pasien", target: "90%", actual: "92%", score: 100 }
        ],
        behavior: [
            { aspect: "Integritas", score: 90, note: "Sangat jujur dan transparan" },
            { aspect: "Kedisiplinan", score: 88, note: "Selalu hadir tepat waktu" }
        ],
        discipline: [],
        training: [
            { name: "Simposium Penyakit Dalam 2023", date: "2023-05-10", type: "Seminar", duration: "2 Hari" }
        ],
        skp: { target: 50, realization: 25, grade: "Baik" }
    },
    { 
        id: 2, employeeId: "199505052022021002", name: "dr. Kevin Sanjaya", role: "Dokter Jaga IGD", unit: "Instalasi Gawat Darurat (IGD)",
        category: "Dokter Umum", employeeType: "Kontrak", joinDate: "2022-01-15", 
        sipNumber: "789/SIP/2022", sipExpiry: "2026-01-15",
        sipImage: null,
        currentShift: "Malam", performance: [80, 85, 87], skpPoints: 10, status: "Active",
         gender: "Laki-laki", birthPlace: "Bandung", birthDate: "1995-05-05", 
         phone: "0811-2233-4455", email: "kevin.s@rs.com", address: "Jl. Dago Atas No. 55, Bandung",
         kpi: [], behavior: [], discipline: [], training: [], skp: { target: 50, realization: 10, grade: "Cukup" }
    },
    { 
        id: 7, employeeId: "198803102010032001", name: "Ns. Siti Aminah, S.Kep", role: "Kepala Ruangan ICU", unit: "ICU / ICCU",
        category: "Perawat", employeeType: "Tetap", joinDate: "2010-03-10", 
        sipNumber: "445/SIK/2019", sipExpiry: "2025-08-20", 
        sipImage: null,
        currentShift: "Pagi", performance: [95, 92, 94], skpPoints: 40, status: "Active",
        gender: "Perempuan", birthPlace: "Surabaya", birthDate: "1988-03-10", 
        phone: "0813-9876-5432", email: "siti.aminah@rs.com", address: "Jl. Gubeng No. 12, Surabaya",
        kpi: [], behavior: [], discipline: [], training: [], skp: { target: 50, realization: 40, grade: "Sangat Baik" }
    },
    { 
        id: 10, employeeId: "198902202014022003", name: "apt. Dewi Sartika, S.Farm", role: "Apoteker PJ", unit: "Instalasi Farmasi (Depot Rawat Jalan)",
        category: "Farmasi", employeeType: "Tetap", joinDate: "2014-02-20", 
        sipNumber: "111/SIPA/2014", sipExpiry: "2024-02-20", 
        currentShift: "Pagi", performance: [96, 95], skpPoints: 48, status: "Active",
        gender: "Perempuan", birthPlace: "Medan", birthDate: "1989-02-20",
        phone: "0812-1122-3344", email: "dewi.s@rs.com", address: "Jl. Gatot Subroto No. 88",
        kpi: [], behavior: [], discipline: [], training: [], skp: { target: 50, realization: 48, grade: "Sangat Baik" }
    },
    { 
        id: 20, employeeId: "199801012023011009", name: "Budi Santoso", role: "Danru Security", unit: "Pos Security Utama",
        category: "Keamanan", employeeType: "Kontrak", joinDate: "2023-01-01", 
        sipNumber: "-", sipExpiry: "-", 
        currentShift: "Malam", performance: [88], skpPoints: 0, status: "Active",
        gender: "Laki-laki", birthPlace: "Bogor", birthDate: "1998-01-01", 
        phone: "0857-1234-5678", email: "-", address: "Jl. Raya Bogor",
        kpi: [], behavior: [], discipline: [], training: [], skp: { target: 0, realization: 0, grade: "-" }
    },
    { 
        id: 21, employeeId: "199505152020052008", name: "Rina Admin", role: "Staff Pendaftaran", unit: "Front Office",
        category: "Manajemen & Admin", employeeType: "Tetap", joinDate: "2020-05-15", 
        sipNumber: "-", sipExpiry: "-", 
        currentShift: "Sore", performance: [90], skpPoints: 0, status: "Active",
        gender: "Perempuan", birthPlace: "Jakarta", birthDate: "1995-05-15", 
        phone: "0812-9988-7766", email: "rina@rs.com", address: "Jl. Tebet Raya",
        kpi: [], behavior: [], discipline: [], training: [], skp: { target: 0, realization: 0, grade: "-" }
    }
];