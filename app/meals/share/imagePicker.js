'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';



export default function Imagepicker({ label, name }){
    const[pickedImage,setPickedImage] = useState();
    const selector = useRef();

    const imageHandler = () => {
        selector.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files [0];

        if (!file){
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {pickedImage ? <Image src={pickedImage} alt='picture' fill/> : 'No images found..'}
                </div>
                <input
                    className={classes.input}
                    type='file'
                    id={name}
                    accept='image/png, image/jpeg'
                    name={name}
                    ref={selector}
                    onChange={handleImageChange}                />
                <button className={classes.button} type='button' onClick={imageHandler}>
                    Pick an Image
                </button>
            </div>
        </div>
    );
}