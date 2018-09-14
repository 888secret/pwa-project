import {baseUrl} from './env'

export default async(url='',data={},type='GET',method='fetch') => {
    type=type.toUpperCase();
    url=baseUrl+url;
    if(type=='GET'){
        Object.keys(data).forEach(key => {
            dataStr+=key+'='+data[key]+'&';
        })

        if(dataStr!==''){
            dataStr=dataStr.substr(0,dataStr.lastIndexOf('&'));
            url=url+'?'+dataStr;
        }
    }

    if(window.fetch&&method=='fetch'){
        let requestConfig={
            method:type,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            mode:"cors",
            cache:"force-cache"
        }
    }
}