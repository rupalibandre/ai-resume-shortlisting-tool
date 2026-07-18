function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-[700px] max-w-[95%] rounded-2xl bg-slate-900 border border-white/10 shadow-2xl">

        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-white"
          >
            ✕
          </button>

        </div>

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;