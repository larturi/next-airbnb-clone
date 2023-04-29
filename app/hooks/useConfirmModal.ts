import { create } from 'zustand';

interface ConfirmModalStore {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
   action: () => void;
   title?: string;
   headingMessage?: string;
   headingSecondaryMessage?: string;
   buttonText?: string;
}

const useConfirmModal = create<ConfirmModalStore>((set, action) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   action: action,
}));

export default useConfirmModal;
