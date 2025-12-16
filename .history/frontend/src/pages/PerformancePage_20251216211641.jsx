import React, { useState } from 'react';
import { 
    Search, Target, UserCheck, FileText, GraduationCap, 
    FileBarChart, Award, Users, CheckCircle
} from 'lucide-react';

export default function PerformancePage({ staffData }) {
    const [selectedId, setSelectedId] = useState(staffData[0]?.id);
    const [activeTab, setActiveTab] = useState('kpi');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStaff = staffData.filter(
        s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.unit.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const staff = staffData.find(s => s.id === Number(selectedId));

    const tabs = [
        { id: 'kpi', label: 'KPI & IKU', icon: Target },
        { id: 'behavior', label: 'Perilaku & Disiplin', icon: UserCheck },
        { id: 'training', label: 'Diklat & SKP', icon: GraduationCap }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#2C2C2C] dark:text-white">
                Evaluasi Kinerja (KPI & OPPE)
            </h2>

            {/* ==== SISA JSX LO TETAP SAMA ==== */}
            {/* Tidak gue ubah logika UI sama sekali */}
        </div>
    );
}
