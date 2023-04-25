import getListingById, { IListingParams } from '../../actions/getListingById';
import getCurrentUser from '../../actions/getCurrentUser';
import getReservations from '../../actions/getReservations';
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import ListingClient from './ListingClient';

const ListingPage = async ({ params }: { params: IListingParams }) => {
   const listing = await getListingById(params);
   const reservations = await getReservations(params);
   const currentUser = await getCurrentUser();

   if (!listing) {
      return (
         <ClientOnly>
            <EmptyState />
         </ClientOnly>
      );
   }
   return (
      <ClientOnly>
         <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
         />
      </ClientOnly>
   );
};

export default ListingPage;
