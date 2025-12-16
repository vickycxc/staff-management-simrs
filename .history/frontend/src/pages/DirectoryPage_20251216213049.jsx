import React, { useState, useEffect } from 'react';
import {
    Search, Filter, ChevronDown, Clock, MoreVertical,
    Eye, Edit, Trash2, User, Briefcase, FileText,
    Check, X, Mail, Phone, MapPin
} from 'lucide-react';

// --- MOCK DATA & COMPONENTS (Since I don't have your local files) ---

// Mocking ../data/jobCategories
const JOB_CATEGORIES = ['All', 'Engineering', 'HR', 'Design', 'Marketing'];

// Mocking ../components/Modal
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

// Mocking ../components/EditStaffModal
const EditStaffModal = ({ isOpen, onClose, staff, onSave }) => {
    const [formData, setFormData] = useState(staff || {});

    useEffect(() => {
        if (staff) setFormData(staff);
    }, [staff]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Staff">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit/Department</label>
                    <input
                        name="unit"
                        value={formData.unit || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                        name="role"
                        value={formData.role || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// --- MAIN COMPONENT (Your Logic) ---

function DirectoryPage({ staffData, onDelete, onUpdate }) {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null); // Used for "View" modal if needed
    const [editingStaff, setEditingStaff] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleMenuClick = (e, id) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleEditClick = (staff) => {
        setEditingStaff(staff);
        setIsEditModalOpen(true);
        setOpenMenuId(null);
    };

    const handleDeleteClick = (id) => {
        if(window.confirm('Are you sure you want to delete this staff member?')) {
            onDelete(id);
        }
    }

    const handleSaveEdit = (updatedStaff) => {
        onUpdate(updatedStaff);
        setIsEditModalOpen(false);
        setEditingStaff(null);
        // Using a cleaner notification than alert in a real app, but complying with logic
        console.log('Data saved'); 
    };

    const filteredData = staffData.filter(staff =>
        (filter === 'All' || staff.category === filter) &&
        (
            staff.name.toLowerCase().includes(search.toLowerCase()) ||
            staff.unit.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="space-y-6 animate-fade-in p-6 bg-gray-50 min-h-screen font-sans">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Briefcase className="text-indigo-600" />
                        Staff Directory
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your team members and roles</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search staff..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white shadow-sm transition-all"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <div className="relative">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full sm:w-40 pl-10 pr-8 py-2 border border-gray-200 rounded-xl appearance-none bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm hover:border-indigo-300 transition-colors"
                            >
                                {JOB_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((staff) => (
                        <div key={staff.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 relative group">
                            
                            {/* Card Header & Menu */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                        {staff.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 line-clamp-1">{staff.name}</h3>
                                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                            {staff.category}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <button 
                                        onClick={(e) => handleMenuClick(e, staff.id)}
                                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <MoreVertical size={20} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openMenuId === staff.id && (
                                        <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10 animate-fade-in origin-top-right">
                                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                <Eye size={14} /> View
                                            </button>
                                            <button 
                                                onClick={() => handleEditClick(staff)}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <Edit size={14} /> Edit
                                            </button>
                                            <div className="h-px bg-gray-100 my-1"></div>
                                            <button 
                                                onClick={() => handleDeleteClick(staff.id)}
                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Briefcase size={16} className="text-gray-400" />
                                    <span>{staff.role}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span>{staff.unit}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>Joined {staff.joinDate || 'Recently'}</span>
                                </div>
                            </div>

                            {/* Decorative footer line */}
                            <div className="absolute bottom-0 left-5 right-5 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No staff found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search or filter.</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <EditStaffModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                staff={editingStaff}
                onSave={handleSaveEdit}
            />
        </div>
    );
}

// --- APP WRAPPER (To simulate your data provider) ---

export default function App() {
    const [staffData, setStaffData] = useState([
        { id: 1, name: "Sarah Connor", category: "Engineering", unit: "Robotics", role: "Lead Engineer", joinDate: "Jan 2023" },
        { id: 2, name: "John Smith", category: "HR", unit: "Recruitment", role: "HR Manager", joinDate: "Mar 2022" },
        { id: 3, name: "Emily Chen", category: "Design", unit: "Product Design", role: "UI/UX Designer", joinDate: "Jun 2023" },
        { id: 4, name: "Michael Ross", category: "Marketing", unit: "Digital Ads", role: "Marketing Specialist", joinDate: "Feb 2023" },
        { id: 5, name: "David Kim", category: "Engineering", unit: "Backend", role: "Senior Dev", joinDate: "Aug 2021" },
    ]);

    const handleUpdate = (updatedStaff) => {
        setStaffData(prev => prev.map(s => s.id === updatedStaff.id ? updatedStaff : s));
        console.log("Updated:", updatedStaff);
    };

    const handleDelete = (id) => {
        setStaffData(prev => prev.filter(s => s.id !== id));
        console.log("Deleted ID:", id);
    };

    return <DirectoryPage staffData={staffData} onUpdate={handleUpdate} onDelete={handleDelete} />;
}