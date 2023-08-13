import { useRef, useEffect, useState, ImgHTMLAttributes } from "react";

type LazyImageProps = {
    src: string;
    onLazyLoad?: (node: HTMLImageElement) => void
}
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

const blankImg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="

export const LazyImage = (props: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null);
    const {src, onLazyLoad,  ...imgProps} = props;
    const [currentSrc, setCurrentSrc] = useState<string>(blankImg);
    const [isLazyLoaded, setIsLazyLoaded] = useState<boolean>(false);

    
    const createObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            for(const entry of entries){
                if(entry.isIntersecting){
                    setCurrentSrc(src)
                    if(node.current && onLazyLoad && !isLazyLoaded){
                        onLazyLoad(node.current);
                        setIsLazyLoaded(true);
                    }
                }
            }
        });
        
        if(node.current){
            observer.observe(node.current);
        }
    
        return () => {
            observer.disconnect();
        }
    }

    useEffect(() => {
        if (isLazyLoaded) {
            return;
        }
        return createObserver();
    },[currentSrc, isLazyLoaded])
    
    return <img 
        ref={node} 
        src={ src } 
        {...imgProps}
    ></img>;
} 