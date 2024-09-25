import { ImageProps } from "next/image"

export const imageLoader: any = ({ src, width, quality }: ImageProps) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }