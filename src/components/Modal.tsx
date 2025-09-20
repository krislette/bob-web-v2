import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
  buttonAction?: () => void;
}

function Modal({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "OK",
  buttonAction,
}: ModalProps) {
  console.log(`Model isOpen ${isOpen}`);
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Don't render modal if it's not open
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    }
    onClose();
  };

  // Handle backdrop click (like if the user clicks outside the modal)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80"
      onClick={handleBackdropClick}
    >
      <div className="bg-black-darker border border-gray-700 rounded-xl p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md w-full mx-2 sm:mx-4 relative flex flex-col">
        {/* Close button*/}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white-custom transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold text-white-custom pr-8">
            {title}
          </h2>
        )}

        {/* Message */}
        <p className="text-gray-300 my-6 leading-relaxed text-center">
          {message}
        </p>

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={handleButtonClick}
            className="bg-blue-custom hover:bg-blue-custom/80 w-32 text-white-custom px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
