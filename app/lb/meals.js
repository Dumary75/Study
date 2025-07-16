import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
};

export function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
}