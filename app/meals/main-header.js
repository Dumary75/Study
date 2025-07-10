'use client';

import Link from "next/link";
import logoImg from '@/assets/logo.png';
import classes from '@/app/meals/main-header.module.css';
import Image from "next/image";
import { usePathname } from "next/navigation";



export default function MainHeader() {
const path = usePathname();

    return (
        <header className={classes.header}>
            <Link href='/' className={classes.logo}>
               <Image src={logoImg} priority alt="Text eben"/>
                NextLevel Food
            </Link>
        
         <nav className={classes.nav}>
            <ul>
                <li>
                    <Link href='./meals' className={path.startsWith('/meals') ? classes.active : undefined}>Browse Meals</Link>
                </li>
                <li>
                    <Link href='./community' className={path.startsWith('/community') ? classes.active : undefined}>Foodies Community</Link>
                </li>
            </ul>
         </nav>
        </header>
    )
}