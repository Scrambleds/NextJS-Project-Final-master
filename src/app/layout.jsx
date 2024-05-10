import { Inter } from 'next/font/google'
import { Noto_Sans_Thai } from "next/font/google"
import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestNavbar from '../components/Navbar/SideNav/component/RestNavbar'
import {Providers} from "./providers";

// const inter = Inter({ subsets: ['latin'] })
const inter = Noto_Sans_Thai({ 
  subsets: ['latin'], 
})
export const metadata = {
  title: 'ระบบจัดเก็บคะเเนนนิสิต',
  description: 'ระบบจัดเก็บคะเเนนนิสิต',
  icons:{
    icon:[
      '/favicon.ico?v=4'
    ],
    apple:[
      '/apple-touch-icon.png?v=4'
    ],
    shortcut:[
      'apple-touch-icon.png'
    ]
  },
  manifest:'/site.webmanifest'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="garden">
      <body className={`bg-white ${inter.className}`} suppressHydrationWarning={true}> 
        <div>
          <RestNavbar>
            <Providers>
              {children}
            </Providers>
          </RestNavbar>
        </div>
        <ToastContainer position="top-center" />
      </body>
    </html>
  )
}