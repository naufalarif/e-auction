import { FunctionComponent } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  width?: string | number | undefined;
  height?: string | number | undefined;
  quality?: number;
  className?: string;
  alt?: string;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
}

const Loader = ({ src, width, quality }: Props) => {
  return quality ? `${src}?w=${width}&q=${quality || 75}` : `${src}`;
}

const Img: FunctionComponent<Props> = ({ 
  src, 
  width = undefined, 
  quality = undefined, 
  alt, 
  layout, 
  ...props 
}) => {
  return (
    <Image
      loader={Loader}
      src={src}
      alt={alt}
      width={width}
      height={quality}
      layout={layout}
      {...props}
    />
  )
}

export default Img;