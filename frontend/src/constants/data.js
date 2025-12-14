export const JOB_CATEGORIES = {
    MEDIS: ['Dokter Spesialis', 'Dokter Umum', 'Dokter Gigi'],
    KEPERAWATAN: ['Perawat', 'Bidan'],
    PENUNJANG: ['Farmasi', 'Laboratorium', 'Radiologi', 'Gizi', 'Fisioterapi', 'Rekam Medis'],
    NON_MEDIS: ['Manajemen & Admin', 'Keuangan', 'IT & SIMRS', 'Teknik (IPSRS)', 'Keamanan', 'Layanan Umum']
};

export const UNIT_MAPPING = {
    'Dokter Spesialis': [
        "Poli Penyakit Dalam", "Poli Bedah Umum", "Poli Anak", "Poli Kandungan (Obgyn)", 
        "Poli Mata", "Poli THT", "Poli Saraf", "Poli Jantung", "Poli Kulit & Kelamin",
        "Poli Kejiwaan", "Poli Rehabilitasi Medik", "Poli Orthopedi",
        "Rawat Inap Utama", "ICU / ICCU", "Kamar Operasi (IBS)"
    ],
    'Dokter Umum': [
        "Instalasi Gawat Darurat (IGD)", "Poli Umum", "Unit Medical Check Up (MCU)"
    ],
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

export const REQUIRED_SIP_DOCS = [
    ...JOB_CATEGORIES.MEDIS,
    ...JOB_CATEGORIES.KEPERAWATAN,
    ...JOB_CATEGORIES.PENUNJANG
];

export const INITIAL_DATA = [
    { 
        id: 1, employeeId: "199001012018011001", name: "dr. Andi Pratama, Sp.PD-KGEH", role: "Spesialis Penyakit Dalam", unit: "Poli Penyakit Dalam",
        category: "Dokter Spesialis", employeeType: "Mitra", joinDate: "2018-05-12", 
        sipNumber: "503/SIP/2018", sipExpiry: "2024-04-01", 
        sipImage: "[https://via.placeholder.com/600x400/17B8A5/ffffff?text=Scan+SIP+dr+Andi](https://via.placeholder.com/600x400/17B8A5/ffffff?text=Scan+SIP+dr+Andi)", 
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
    // ... (Tambahkan data dummy lainnya dari App.jsx jika perlu)
];
