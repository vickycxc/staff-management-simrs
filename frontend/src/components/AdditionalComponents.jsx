import { ChevronRight } from 'lucide-react';

const WidgetCard = ({ title, count, icon: Icon, colorClass, borderColorClass, onClick }) => (
    <div onClick={onClick} className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-l-4 ${borderColorClass} cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
        <div className="flex justify-between items-start">
            <div><p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p><h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2 group-hover:text-[#17B8A5] transition-colors">{count}</h3></div>
            <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${colorClass} group-hover:bg-white transition-colors`}><Icon size={24} /></div>
        </div>
        <p className={`text-xs mt-4 font-semibold flex items-center gap-1 ${colorClass.replace('text-', 'text-opacity-80 text-')}`}>Lihat Daftar <ChevronRight size={12}/></p>
    </div>
);

const ChevronDownIcon = () => <ChevronRight className="rotate-90 text-gray-400" size={16}/>;