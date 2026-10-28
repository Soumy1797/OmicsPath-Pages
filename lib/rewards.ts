import { lessons, modules } from './curriculum';
export function learningRewards(ids:string[]){
 const completed=new Set(ids.filter(id=>lessons.some(l=>l.id===id)));
 const badges=modules.filter(module=>lessons.filter(l=>l.module===module).every(l=>completed.has(l.id)));
 return {xp:completed.size*100,completed:completed.size,badges,chapter:Math.min(badges.length+1,modules.length)};
}
