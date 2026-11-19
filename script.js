const services=[
{name:'تصميم المنيوهات',price:60,icon:'▤',desc:'منيو للمطاعم والكافيهات، مع إمكانية إضافة QR.'},
{name:'تصميم بورتفوليو',price:800,icon:'▣',desc:'موقع شخصي لعرض مهاراتك وخدماتك وأعمالك.'},
{name:'إنشاء متجر إلكتروني',price:2000,icon:'🛒',desc:'متجر لعرض المنتجات واستقبال طلبات العملاء.'},
{name:'التصميم الجرافيكي',price:60,icon:'✦',desc:'تصميمات متنوعة، والسعر النهائي حسب نوع التصميم.'},
{name:'إنشاء موقع إلكتروني',price:1200,icon:'⌘',desc:'موقع إلكتروني متجاوب يناسب نشاطك.'},
{name:'تصميم CV',price:60,icon:'▧',desc:'سيرة ذاتية منظمة بتصميم واضح.'}
];
const grid=document.getElementById('servicesGrid'),select=document.getElementById('serviceSelect');
let chosen=null,discount=0;
const fmt=n=>n.toLocaleString('en-US')+' جنيه';
services.forEach((s,i)=>{
 const card=document.createElement('article');card.className='service-card';
 card.innerHTML=`<div class="service-icon">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p><div class="service-bottom"><span class="price">${s.name==='التصميم الجرافيكي'?'يبدأ من ':''}${fmt(s.price)}</span><button type="button" data-i="${i}">اطلب الخدمة ←</button></div>`;
 grid.appendChild(card);
 const op=document.createElement('option');op.value=s.name;op.textContent=s.name;select.appendChild(op);
});
function update(){document.getElementById('priceField').value=chosen?fmt(chosen.price):'';document.getElementById('totalPrice').textContent=chosen?fmt(Math.max(0,chosen.price-discount)):'— جنيه';}
function choose(name){chosen=services.find(s=>s.name===name)||null;select.value=name||'';discount=0;document.getElementById('couponInput').value='';document.getElementById('couponMessage').textContent='اسأل عبر واتساب عن أكواد الخصم المتاحة.';update();}
grid.addEventListener('click',e=>{const b=e.target.closest('button[data-i]');if(!b)return;choose(services[Number(b.dataset.i)].name);document.getElementById('order').scrollIntoView({behavior:'smooth'});});
select.addEventListener('change',()=>choose(select.value));
document.getElementById('applyCoupon').addEventListener('click',()=>{
 const code=document.getElementById('couponInput').value.trim().toUpperCase();
 // أكواد تجريبية قابلة للتعديل من ملف script.js
 const codes={'AHMED5':5,'WELCOME10':10};
 if(!chosen){document.getElementById('couponMessage').textContent='اختر الخدمة أولاً.';return;}
 if(codes[code]){discount=Math.round(chosen.price*codes[code]/100);document.getElementById('couponMessage').textContent=`تم تطبيق خصم ${codes[code]}% بنجاح.`;}
 else{discount=0;document.getElementById('couponMessage').textContent='الكود غير صحيح أو غير متاح.';}
 update();
});
document.getElementById('orderForm').addEventListener('submit',e=>{
 e.preventDefault();
 if(!chosen){alert('من فضلك اختر الخدمة المطلوبة.');return;}
 const f=e.currentTarget, data=new FormData(f);
 const name=data.get('name').trim(),phone=data.get('phone').trim(),details=data.get('details').trim();
 const total=Math.max(0,chosen.price-discount);
 const msg=`طلب خدمة جديد من موقع Ahmed Emad Portfolio%0Aالاسم: ${encodeURIComponent(name)}%0Aرقم العميل: ${encodeURIComponent(phone)}%0Aالخدمة: ${encodeURIComponent(chosen.name)}%0Aالسعر: ${encodeURIComponent(fmt(total))}%0Aتفاصيل الطلب: ${encodeURIComponent(details||'لا توجد تفاصيل إضافية')}%0Aرقم التحويل بالمحفظة: 01107037428%0Aملاحظة: سأرسل صورة إثبات التحويل في هذه المحادثة.`;
 window.open('https://wa.me/201280673759?text='+msg,'_blank');
 const file=document.getElementById('proofFile').files[0];
 if(file) alert('تم فتح واتساب برسالة الطلب. أرفق صورة التحويل يدويًا داخل المحادثة؛ المتصفح لا يرسل الملف تلقائيًا.');
});
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
