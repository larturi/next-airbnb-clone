'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';
import useConfirmModal from '@/app/hooks/useConfirmModal';

import { SafeReservation, SafeUser } from '@/app/types';

interface TripsClientProps {
   reservations: SafeReservation[];
   currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
   reservations,
   currentUser,
}) => {
   const router = useRouter();
   const [deletingId, setDeletingId] = useState('');
   const confirmModal = useConfirmModal();

   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id);

         axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
               toast.success('Reservation cancelled');
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

   const onBeforeCancel = useCallback(
      (id: string) => {
         confirmModal.title = 'Please, confirm cancellation';
         confirmModal.headingMessage = 'Are you sure to cancel the trip?';
         confirmModal.headingSecondaryMessage =
            'The reservation will be completely lost';
         confirmModal.buttonText = 'Yes, cancel';
         confirmModal.action = () => onCancel(id);
         confirmModal.onOpen();
      },
      [confirmModal, onCancel]
   );

   return (
      <Container>
         <Heading
            title='Trips'
            subtitle="Where you've been and where you're going"
         />
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
            {reservations.map((reservation: any) => (
               <ListingCard
                  key={reservation.id}
                  data={reservation.listing}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onBeforeCancel}
                  disabled={deletingId === reservation.id}
                  actionLabel='Cancel Reservation'
                  currentUser={currentUser}
               />
            ))}
         </div>
      </Container>
   );
};

export default TripsClient;
