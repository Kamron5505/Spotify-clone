import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

let toastId = 0;

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, duration = 3000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className="bg-[#2e77d0] text-white px-5 py-2.5 rounded-lg shadow-lg text-sm animate-fade-in whitespace-nowrap"
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
