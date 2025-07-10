import MealsGrid from "./meals-grid";
import classes from './page.module.css';
import Link from "next/link";

export default function Meals() {
  return (
    <>
    <header className={classes.header}>
      <h1>
        Delicious meals, created{' '}
         <span className={classes.highlight}>by you</span>
      </h1>
      <p>
        Choose your facorite recipe and cook it yourself. It is easy and fun!
      </p>
      <p className={classes.cta}>
        <Link href='/meals/share'>
          Share Your Favorite Recipe
        </Link>
      </p>
    </header>
      <main className={classes.main}>
        <MealsGrid meals={[]}/>
      </main>

   </>   
  );
}


