import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, large = false }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${large ? 'max-w-4xl' : 'max-w-3xl'} max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700`}>
                <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 transition-colors"><X size={20}/></button>
                </div>
                <div className="p-0 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
