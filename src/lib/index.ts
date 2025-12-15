import { browser } from "$app/environment";

// place files you want to import through the `$lib` alias in this folder.
export const preload = async (src:string):Promise<HTMLImageElement | null> => {
    return new Promise((resolve, reject)=>{
        if(browser) {
            let img = new Image();
            img.src = src; 
            img.onload = () => {resolve(img); console.log("image loaded", img.width, img.height)};
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        } else {
            // On server-side, resolve with null to avoid pending state
            resolve(null);
        }
    })
}