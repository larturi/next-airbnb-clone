'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';

import { SafeListing, SafeUser } from '@/app/types';
import useConfirmModal from '@/app/hooks/useConfirmModal';

interface PropertiesClientProps {
   listings: SafeListing[];
   currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
   listings,
   currentUser,
}) => {
   const router = useRouter();
   const [deletingId, setDeletingId] = useState('');

   const confirmModal = useConfirmModal();

   const onDelete = useCallback(
      (id: string) => {
         setDeletingId(id);

         axios
            .delete(`/api/listings/${id}`)
            .then(() => {
               toast.success('Listing deleted');
               router.refresh();
            })
            .catch((error) => {
               toast.error(error?.response?.data?.error);
            })
            .finally(() => {
               setDeletingId('');
               confirmModal.onClose();
            });
      },
      [router, confirmModal]
   );

   const onBeforeDelete = useCallback(
      (id: string) => {
         confirmModal.title = 'You are about to completely delete the property';
         confirmModal.headingMessage = 'Are you sure to delete the property?';
         confirmModal.headingSecondaryMessage =
            'The deletion will be permanent';
         confirmModal.buttonText = 'Yes, delete';
         confirmModal.action = () => onDelete(id);
         confirmModal.onOpen();
      },
      [confirmModal, onDelete]
   );

   return (
      <Container>
         <Heading title='Properties' subtitle='List of your propeties' />
         <div
            className='
                mt-10
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                '
         >
            {listings.map((listing: any) => (
               <ListingCard
                  key={listing.id}
                  data={listing}
                  actionId={listing.id}
                  onAction={onBeforeDelete}
                  disabled={deletingId === listing.id}
                  actionLabel='Delete Property'
                  currentUser={currentUser}
               />
            ))}
         </div>
      </Container>
   );
};

export default PropertiesClient;
