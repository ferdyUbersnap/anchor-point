export interface Sticker{
    id?:string
    sticker?:Content;
    name:string;
    width:number;
    height:number;
    x:number;
    y:number;
    anchor:"top-left"|"top-center"|"top-right"|"middle-left"|"middle-center"|"middle-right"|"bottom-left"|"bottom-center"|"bottom-right";
    size:"Custom"|"Fit"|"Fill";
    angle:number;
}
export interface Content {
    key:string;
    path:string;
    width:number;
    height:number
}