const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {   logo: 'A',logoType: 'text' ,url:'https://www.acfun.cn'},
    {   logo: '#iconCN_bilibiliB',logoType: 'icon',url :'https://www.bilibili.com'}
]
const removeUrl = (url) => {
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')
}

let load =()=>{
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach((node,index) => {
        if(node.logoType === 'text'){
            console.log(index)
            const $li = $(`
                <li>
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${removeUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon">
                                <use xlink:href="#iconguanbi"></use>
                            </svg>
                        </div>
                    </div>
                </li>`).insertBefore($lastLi)
                $li.on('click','.close',(e)=>{
                    e.stopPropagation()
                    let flag = confirm('确定吗？')
                    if(flag){
                    hashMap.splice(index,1)
                    load()
                    }
                })
                $li.on('click',() =>{
                    window.location.href = node.url
                })
                
        }
        else if(node.logoType === 'icon'){
            const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">
                        <svg class="icon">
                            <use xlink:href="${node.logo}"></use>
                        </svg>
                    </div>
                    <div class="link">${removeUrl(node.url)}</div>
                    <div class="close">
                            <svg class="icon">
                                <use xlink:href="#iconguanbi"></use>
                            </svg>
                        </div>
                </div>
            </li>`).insertBefore($lastLi)
            $li.on('click','.close',(e)=>{
                e.stopPropagation()
                let flag = confirm('确定吗？')
                if(flag){
                hashMap.splice(index,1)
                load()
                }
            })
            $li.on('click',() =>{
                window.location.href = node.url
            })
        }
    })
}
load();
$('.addButton')
    .on('click',() => {
       let url = window.prompt('请输入你要添加的网址')
        if(url === ''){
            alert('您还没有输入网址')
        }
        else if(url.indexOf('https')!== 0){
        url =  'https://' + url
        hashMap.push({
            logo: removeUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        })
       load()
        }
    })

    window.onbeforeunload = () =>{
        const string = JSON.stringify(hashMap)
        localStorage.setItem('x',string)
    }

    $(document).on('keypress',(e) =>{
        let key = e.key
        for(let i = 0; i < hashMap.length; i ++){
            if(key===removeUrl(hashMap[i].url)[0]){
                window.location.href = hashMap[i].url
                break
            }
        }
    })