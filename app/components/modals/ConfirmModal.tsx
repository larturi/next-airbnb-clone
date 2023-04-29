'use client';

import useConfirmModal from '@/app/hooks/useConfirmModal';
import Modal from './Modal';
import Heading from '../Heading';

const ConfirmModal = () => {
   const confirmModal = useConfirmModal();

   const bodyContent = (
      <div className='flex flex-col gap-4'>
         <Heading
            title={confirmModal.headingMessage || 'Are you sure?'}
            subtitle={
               confirmModal.headingSecondaryMessage ||
               'This action cannot be reversed'
            }
         />
      </div>
   );

   return (
      <Modal
         body={bodyContent}
         isOpen={confirmModal.isOpen}
         onClose={confirmModal.onClose}
         onSubmit={confirmModal.action}
         title={confirmModal.title || 'Confirm Action'}
         actionLabel={confirmModal.buttonText || 'Continue'}
      />
   );
};

export default ConfirmModal;
