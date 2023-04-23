import './globals.css';
import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import ToastProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
   title: 'Airbnb Clone',
   description: 'Airbnb Clone with Next.js 13',
};

const font = Nunito({
   subsets: ['latin'],
});

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const currentUser = await getCurrentUser();
   return (
      <html lang='en'>
         <body className={font.className}>
            <ClientOnly>
               <ToastProvider />
               <RentModal />
               <LoginModal />
               <RegisterModal />
               <Navbar currentUser={currentUser} />
            </ClientOnly>
            <div className='pb-20 pt-28'>{children}</div>
         </body>
      </html>
   );
}
