'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { MenuItem } from './MenuItem';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import useRentModal from '../../hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '../../types';

interface UserMenuProps {
   currentUser: SafeUser | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
   const router = useRouter();

   const [isOpen, setIsOpen] = useState(false);
   const registerModal = useRegisterModal();
   const rentModal = useRentModal();
   const loginModal = useLoginModal();

   const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value);
   }, []);

   const onRent = useCallback(() => {
      if (!currentUser) {
         return loginModal.onOpen();
      }
      rentModal.onOpen();
   }, [currentUser, loginModal, rentModal]);

   return (
      <div className='relative'>
         <div className='flex flex-row items-center gap-2'>
            <div
               onClick={onRent}
               className='
                    hidden 
                    md:block
                    text-sm 
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                '
            >
               Airbnb your home
            </div>

            <div
               onClick={toggleOpen}
               className='
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                '
            >
               <AiOutlineMenu />
               <div className='hidden md:block'>
                  <Avatar src={currentUser?.image} />
               </div>
            </div>
         </div>

         {isOpen && (
            <div
               className='
                    absolute 
                    rounded-xl 
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '
            >
               <div className='flex flex-col cursor-pointer'>
                  {currentUser ? (
                     <>
                        <MenuItem
                           onClick={() => router.push('/trips')}
                           label='Trips'
                        />
                        <MenuItem
                           onClick={() => {
                              // registerModal.onOpen();
                           }}
                           label='Favorites'
                        />
                        <MenuItem
                           onClick={() => {
                              // registerModal.onOpen();
                           }}
                           label='Reservations'
                        />
                        <MenuItem
                           onClick={() => {
                              // registerModal.onOpen();
                           }}
                           label='Properties'
                        />
                        <MenuItem
                           onClick={rentModal.onOpen}
                           label='Airbnb My Home'
                        />
                        <hr />
                        <MenuItem
                           onClick={() => {
                              signOut();
                           }}
                           label='Logout'
                        />
                     </>
                  ) : (
                     <>
                        <MenuItem
                           onClick={() => {
                              loginModal.onOpen();
                              toggleOpen();
                           }}
                           label='Login'
                        />
                        <MenuItem
                           onClick={() => {
                              registerModal.onOpen();
                              toggleOpen();
                           }}
                           label='Sign Up'
                        />
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default UserMenu;
