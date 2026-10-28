'use client';
import {useEffect,useRef} from 'react';

/** Decorative scientific motifs, not sequence data or a molecular structure model. */
export function ScrollBackground({motion,scene}:{motion:boolean;scene:string}){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const node=canvas.current;if(!node)return;const ctx=node.getContext('2d',{alpha:true});if(!ctx)return;
  let width=0,height=0,left=0,frame=0,last=0,elapsed=0,currentScroll=0,targetScroll=0;
  let active=!document.hidden;
  const tau=Math.PI*2;
  const seed=(n:number)=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const clamp=(n:number)=>Math.max(0,Math.min(1,n));
  const smooth=(a:number,b:number,t:number)=>{const k=clamp((t-a)/(b-a));return k*k*(3-2*k);};
  function glow(x:number,y:number,r:number,color:string,alpha:number){
   const g=ctx!.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${color},${alpha})`);g.addColorStop(.45,`rgba(${color},${alpha*.35})`);g.addColorStop(1,`rgba(${color},0)`);ctx!.fillStyle=g;ctx!.fillRect(x-r,y-r,r*2,r*2);
  }
  function dna(x:number,y:number,scale:number,rotation:number,phase:number,opacity:number){
   ctx!.save();ctx!.translate(x,y);ctx!.rotate(rotation);ctx!.globalAlpha=opacity;
   const pairs=35,span=14*scale,r=67*scale;
   const rows=Array.from({length:pairs},(_,i)=>({y:(i-pairs/2)*span,x:Math.sin(i*.32+phase)*r,z:Math.cos(i*.32+phase)}));
   for(const row of rows){ctx!.strokeStyle=`rgba(92,153,233,${.22+(row.z+1)*.1})`;ctx!.lineWidth=2*scale;ctx!.beginPath();ctx!.moveTo(-row.x,row.y);ctx!.lineTo(row.x,row.y);ctx!.stroke();}
   for(const side of [-1,1]){ctx!.strokeStyle=side<0?'rgba(151,85,235,.7)':'rgba(18,196,239,.75)';ctx!.lineWidth=2.5*scale;ctx!.beginPath();rows.forEach((r,i)=>{if(i)ctx!.lineTo(side*r.x,r.y);else ctx!.moveTo(side*r.x,r.y);});ctx!.stroke();}
   for(const row of rows)for(const side of [-1,1]){const depth=(side*row.z+1)/2;ctx!.fillStyle=side<0?`rgba(151,85,235,${.4+depth*.6})`:`rgba(18,196,239,${.4+depth*.6})`;ctx!.beginPath();ctx!.arc(side*row.x,row.y,(2.7+depth*2.5)*scale,0,tau);ctx!.fill();}
   ctx!.restore();
  }
  function molecule(x:number,y:number,r:number,phase:number,opacity:number){
   ctx!.save();ctx!.translate(x,y);ctx!.rotate(phase);ctx!.globalAlpha=opacity;
   const points=Array.from({length:9},(_,i)=>{const a=i*tau/6;const ring=i<6?1:1.68;return{x:Math.cos(a)*r*ring,y:Math.sin(a)*r*ring};});
   const links=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[2,8],[1,7]];
   ctx!.strokeStyle='rgba(154,161,180,.55)';ctx!.lineWidth=1.4;
   links.forEach(([a,b])=>{ctx!.beginPath();ctx!.moveTo(points[a].x,points[a].y);ctx!.lineTo(points[b].x,points[b].y);ctx!.stroke();});
   points.forEach((p,i)=>{ctx!.fillStyle=i%3===0?'#12c4ef':i%3===1?'#b790f1':'#6ba7ed';ctx!.beginPath();ctx!.arc(p.x,p.y,i<6?5.5:3,0,tau);ctx!.fill();ctx!.strokeStyle='rgba(174,196,255,.17)';ctx!.beginPath();ctx!.arc(p.x,p.y,i<6?13:8,0,tau);ctx!.stroke();});ctx!.restore();
  }
  function sequencing(y:number,shift:number,opacity:number){
   const colors=['18,196,239','92,153,233','151,85,235','151,171,181'];
   const size=width<600?22:30,columns=Math.ceil((width-left)/size)+3;
   ctx!.save();ctx!.globalAlpha=opacity;ctx!.font='10px ui-monospace, monospace';ctx!.textAlign='center';
   for(let row=0;row<7;row++)for(let col=0;col<columns;col++){
    const x=left+(col-1)*size+shift%size,py=y+row*23;const base=Math.floor(seed(row*77+col+3)*4);
    const a=.13+seed(row*13+col+11)*.15;ctx!.fillStyle=`rgba(${colors[base]},${a})`;ctx!.fillRect(x,py,size-4,16);
    ctx!.fillStyle=`rgba(${colors[base]},.7)`;ctx!.fillText('ACGT'[base],x+(size-4)/2,py+12);
   }
   ctx!.restore();
  }
  function render(){
   if(!width||!height)return;
   ctx!.clearRect(0,0,width,height);
   const field=width-left,small=field<650;
   const fullHeight=Math.max(1,document.documentElement.scrollHeight-height);
   const progress=motion?clamp(currentScroll/fullHeight):0;
   const t=motion?elapsed*.00013:0;
   const sequenceStage=smooth(.45,.95,progress),moleculeStage=smooth(.1,.55,progress);
   ctx!.save();ctx!.beginPath();ctx!.rect(left,0,field,height);ctx!.clip();
   glow(left+field*.9,height*.2-progress*height*.22,Math.max(320,field*.6),'111,105,139',.22);
   glow(left+field*.08,height*.76-progress*height*.17,Math.max(280,field*.45),'83,118,119',.16);
   glow(left+field*.65,height*.94,Math.max(290,field*.5),'124,110,139',.1+sequenceStage*.09);
   // Two independently moving strands provide parallax at the margins.
   dna(left+field*.91+Math.sin(t)*13,height*.43-currentScroll*.13,small?.77:1.2,-.3+progress*.45,t,.7-sequenceStage*.24);
   dna(left+field*.05,height*.95-currentScroll*.07,small?.56:.84,.37-progress*.2,-t+.9,.40);
   molecule(left+field*.82,height*.84-currentScroll*.075,small?37:58,t*.24,.18+moleculeStage*.48);
   molecule(left+field*.12,height*.36-currentScroll*.04,small?28:42,-t*.32,.16+moleculeStage*.27);
   molecule(left+field*.65,height*.1+currentScroll*.045,small?20:32,t*.18,.12+moleculeStage*.18);
   const particles=Array.from({length:small?22:44},(_,i)=>({x:left+seed(i+1)*field+Math.sin(t*.8+i)*7,y:((seed(i+77)*height-currentScroll*(.02+seed(i+8)*.07)+Math.cos(t+i)*5)%(height+60)+height+60)%(height+60)-30,r:.7+seed(i+9)*1.7}));
   ctx!.lineWidth=.6;
   for(let i=0;i<particles.length;i++){const p=particles[i];for(let j=i+1;j<particles.length;j++){const q=particles[j],distance=Math.hypot(p.x-q.x,p.y-q.y);if(distance<92){ctx!.strokeStyle=`rgba(122,164,220,${(1-distance/92)*.12})`;ctx!.beginPath();ctx!.moveTo(p.x,p.y);ctx!.lineTo(q.x,q.y);ctx!.stroke();}}ctx!.fillStyle=`rgba(161,202,245,${.24+seed(i+45)*.24})`;ctx!.beginPath();ctx!.arc(p.x,p.y,p.r,0,tau);ctx!.fill();}
   // The sequencing field rises into view as the learner moves down the page.
   sequencing(height*.96-sequenceStage*height*.43,progress*90,.18+sequenceStage*.7);
   // Low-contrast ruler echoes an alignment view without pretending to show real data.
   ctx!.strokeStyle='rgba(160,185,232,.09)';ctx!.lineWidth=1;for(let i=0;i<field/30;i++){const x=left+i*30;ctx!.beginPath();ctx!.moveTo(x,height*.94-sequenceStage*height*.43);ctx!.lineTo(x,height*.94-sequenceStage*height*.43-(i%5?4:9));ctx!.stroke();}
   ctx!.restore();
  }
  function resize(){const rect=node!.getBoundingClientRect();width=rect.width;height=rect.height;left=Math.max(0,node!.parentElement?.getBoundingClientRect().left??0);const dpr=Math.min(window.devicePixelRatio||1,1.5);node!.width=Math.round(width*dpr);node!.height=Math.round(height*dpr);ctx!.setTransform(dpr,0,0,dpr,0,0);render();}
  function tick(now:number){frame=0;if(!active||!motion)return;if(now-last>=32){elapsed+=Math.min(50,now-last||33);last=now;currentScroll+=(targetScroll-currentScroll)*.16;render();}frame=requestAnimationFrame(tick);}
  function scroll(){targetScroll=window.scrollY;}
  function visibility(){active=!document.hidden;cancelAnimationFrame(frame);frame=0;last=0;if(active&&motion)frame=requestAnimationFrame(tick);}
  const observer=new ResizeObserver(resize);observer.observe(node);if(node.parentElement)observer.observe(node.parentElement);
  targetScroll=motion?window.scrollY:0;currentScroll=targetScroll;resize();
  if(motion){window.addEventListener('scroll',scroll,{passive:true});document.addEventListener('visibilitychange',visibility);if(active)frame=requestAnimationFrame(tick);}
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',scroll);document.removeEventListener('visibilitychange',visibility);};
 },[motion,scene]);
 return <canvas ref={canvas} className="science-backdrop" aria-hidden="true"/>;
}
