'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';

import MenuItem from './MenuItem';
import Avatar from '../Avatar';

interface UserMenuProps {
   currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
   const router = useRouter();

   const loginModal = useLoginModal();
   const registerModal = useRegisterModal();
   const rentModal = useRentModal();

   const [isOpen, setIsOpen] = useState(false);

   const menuRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [menuRef]);

   const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value);
   }, []);

   const onRent = useCallback(() => {
      if (!currentUser) {
         return loginModal.onOpen();
      }

      rentModal.onOpen();
   }, [loginModal, rentModal, currentUser]);

   return (
      <div className='relative' ref={menuRef}>
         <div className='flex flex-row items-center gap-3'>
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
                           label='Trips'
                           onClick={() => {
                              setIsOpen(false);
                              router.push('/trips');
                           }}
                        />
                        <MenuItem
                           label='Favorites'
                           onClick={() => {
                              setIsOpen(false);
                              router.push('/favorites');
                           }}
                        />
                        <MenuItem
                           label='Reservations'
                           onClick={() => {
                              setIsOpen(false);
                              router.push('/reservations');
                           }}
                        />
                        <MenuItem
                           label='Properties'
                           onClick={() => {
                              setIsOpen(false);
                              router.push('/properties');
                           }}
                        />
                        <MenuItem
                           label='Airbnb your home'
                           onClick={rentModal.onOpen}
                        />
                        <hr />
                        <MenuItem label='Logout' onClick={() => signOut()} />
                     </>
                  ) : (
                     <>
                        <MenuItem label='Login' onClick={loginModal.onOpen} />
                        <MenuItem
                           label='Sign up'
                           onClick={registerModal.onOpen}
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
