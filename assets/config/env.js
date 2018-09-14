let baseUrl='';
let routerMode='hash';
let baseImgPath;

if(process.env.NODE_ENV == 'development'){
    baseUrl='//localhost';
    baseImgPath='img/';
}else{
    baseUrl='';
    baseImgPath='';
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}