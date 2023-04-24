'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import { SafeListing, SafeReservation, SafeUser } from '../../types';
import useLoginModal from '../../hooks/useLoginModal';
import Container from '../../components/Container';
import { categories } from '../../constants/categories';
import ListingHead from '../../components/listings/ListingHead';
import ListingInfo from '../../components/listings/ListingInfo';

const initialDateRange = {
   startDate: new Date(),
   endDate: new Date(),
   key: 'selection',
};

interface ListingClientProps {
   reservations?: SafeReservation[];
   listing: SafeListing & {
      user: SafeUser;
   };
   currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
   listing,
   reservations = [],
   currentUser,
}) => {
   const category = useMemo(() => {
      return categories.find((items) => items.label === listing.category);
   }, [listing.category]);

   return (
      <Container>
         <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
               <ListingHead
                  title={listing.title}
                  imageSrc={listing.imageSrc}
                  locationValue={listing.locationValue}
                  id={listing.id}
                  currentUser={currentUser}
               />
               <div
                  className='
                    grid 
                    grid-cols-1 
                    md:grid-cols-7 
                    md:gap-10 
                    mt-6
                    '
               >
                  <ListingInfo
                     user={listing.user}
                     category={category}
                     description={listing.description}
                     roomCount={listing.roomCount}
                     guestCount={listing.guestCount}
                     bathroomCount={listing.bathroomCount}
                     locationValue={listing.locationValue}
                  />
               </div>
            </div>
         </div>
      </Container>
   );
};

export default ListingClient;
