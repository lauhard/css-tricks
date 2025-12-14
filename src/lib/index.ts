import { browser } from "$app/environment";

// place files you want to import through the `$lib` alias in this folder.
export const preload = async (src:string):Promise<HTMLImageElement> => {
    return new Promise((resolve, reject)=>{
        if(browser) {
            let img = new Image();
            img.src = src; 
            img.onload = () => resolve(img);
            img.onerror = () => reject
        }
    })
}