import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return (
         <ClientOnly>
            <EmptyState title='Unauthorized' subtitle='Please login' />
         </ClientOnly>
      );
   }

   const favorites = await getFavoriteListings();

   if (favorites.length === 0) {
      return (
         <ClientOnly>
            <EmptyState
               title='No favorites found'
               subtitle='Looks like you have no favorites'
            />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
         <FavoritesClient listings={favorites} currentUser={currentUser} />
      </ClientOnly>
   );
};

export default FavoritesPage;
