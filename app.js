document.getElementById('start').addEventListener('click',()=>{document.body.classList.toggle('started');});

// Задача 2: первое интерактивное состояние бензольного кольца.
const ringPath=document.querySelector('.dopamine path[d^="M310 205"]');
if(ringPath){
  const ring=ringPath.parentElement;
  ring.style.cursor='pointer';
  ring.style.transition='filter .25s ease, opacity .25s ease';
  ring.addEventListener('click',()=>{
    const active=ring.classList.toggle('is-active');
    ring.style.filter=active?'drop-shadow(0 0 18px #48eadc) drop-shadow(0 0 34px #6b55ff)':'none';
    ring.style.opacity=active?'1':'.96';
  });
}
