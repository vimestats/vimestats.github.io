function setCookie(e,n){let t=new Date((new Date).getTime()+6048e5);document.cookie=e+"="+n+"; path=/; expires="+t}function getCookie(e){let n=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return n?decodeURIComponent(n[1]):void 0}function setLinkParameter(e,n,t){n=encodeURIComponent(n);let i,o,l=[],a="?",r="";if(t?(i=`${t.split("?")[0]}?`,-1!==t.indexOf("&")?l=t.split("?")[1].split("&"):-1!==t.indexOf("?")&&(l[0]=t.split("?")[1])):(i=`${window.location.pathname}?`,window.location.search&&(l=window.location.search.substring(1).split("&"))),""!==window.location.search||l)for(let t of l)console.log(t,e,l),-1===t.indexOf(`${e}=`)?r+=`&${t}`:(r+=`&${e}=${n}`,o=!0),a="&";return o||(r+=`${a}${e}=${n}`),i+=r.substring(1),i}function getLinkParameter(e){let n=window.location.search.split("&");for(let t of n)if(-1!==t.indexOf(`${e}=`)){return t.split("=")[1]}}function delLinkParameter(e,n){finalLink=n?n.split("?"):window.location.href.split("?");let t=new RegExp(`(\\?|&)${e}=[^&]+`,"g"),i=`?${finalLink[1]}`.replace(t,"");i=i.replace(/^&|\?/,"");let o=""===i?"":"?";return finalLink[0]+o+i}