(function(){
 const status=document.getElementById('offlineStatus');
 function show(){const online=navigator.onLine;status.textContent=online?'● متصل بالإنترنت':'● تعمل المعاينة دون إنترنت';status.className='offline-status '+(online?'online':'offline');}
 window.addEventListener('online',show);window.addEventListener('offline',show);show();
 const copy=document.getElementById('copyWallet');
 if(copy)copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('01107037428');copy.textContent='تم نسخ الرقم ✓';}catch(e){copy.textContent='الرقم: 01107037428';}});
 // Service worker works only when served from HTTPS/localhost, not by opening file:// directly.
 if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
   navigator.serviceWorker.register('./sw.js').catch(()=>{});
 }
})();