export interface IImage {
    type?: string,
    mimeType?: string,
    src?: string,
    size?: {
        width: number,
        height: number
    },
    sizes?: string,
    srcset?: string[],
    dataUri?: string
}

export class Image implements IImage {

    constructor(public type?: string, public mimeType?: string, public src?: string, public size?: { width: number, height: number },
                public sizes?: string, public srcset?: string[], public dataUri?: string) {
    }

    static fromJson(cover): string | Image {
        if (typeof cover === 'string') {
            return cover;
        } else {
            return new Image(cover.type, cover.mimeType, cover.src, cover.size, cover.sizes, cover.srcset, cover.dataUri);
        }
    }
}
