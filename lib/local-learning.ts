import {grade} from './grading.ts';
import {lessons} from './curriculum.ts';
export const progressKey = 'omicspath.pages.progress.v1';
type ProgressRow = {lesson_id:string;completed_at:string;score:number};
type StorageLike = Pick<Storage,'getItem'|'setItem'>;
export function readProgress(storage:StorageLike):ProgressRow[]{
 const raw=storage.getItem(progressKey); if(raw===null)return [];
 const rows=JSON.parse(raw);
 if(!Array.isArray(rows)||rows.length>lessons.length)throw Error('Saved progress is invalid. Restore your browser data or clear this site’s storage to start again.');
 const seen=new Set<string>();
 for(const row of rows){if(!row||!lessons.some(l=>l.id===row.lesson_id)||seen.has(row.lesson_id)||typeof row.completed_at!=='string'||!Number.isFinite(Date.parse(row.completed_at))||row.score!==2)throw Error('Saved progress is invalid. Export or preserve your browser data before clearing this site’s storage.');seen.add(row.lesson_id);}
 return rows;
}
export function assessLocal(storage:StorageLike,body:{lessonId:string;answers:unknown;mode?:string}){
 const feedback=grade(body.lessonId,body.answers);
 const progress=readProgress(storage);
 const index=lessons.findIndex(l=>l.id===body.lessonId);
 const diagnostic=body.mode==='diagnostic';
 if(index>0&&!diagnostic&&!progress.some(p=>p.lesson_id===lessons[index-1].id))throw Error('Pass the previous lesson before submitting this checkpoint.');
 const passed=feedback.every(f=>f.correct);
 const earned=passed&&!diagnostic&&!progress.some(p=>p.lesson_id===body.lessonId);
 if(earned){progress.push({lesson_id:body.lessonId,completed_at:new Date().toISOString(),score:feedback.length});storage.setItem(progressKey,JSON.stringify(progress));}
 return {passed,feedback,saved:passed&&!diagnostic,earned};
}
// No network, user identity, or shared database. Answer keys are public in this edition.
export async function localLearningRequest(path:string,init?:RequestInit):Promise<Response>{
 try{
  const storage=window.localStorage;
  if(path==='/api/progress')return Response.json({progress:readProgress(storage)});
  if(path==='/api/assess')return Response.json(assessLocal(storage,JSON.parse(String(init?.body||'{}'))));
  return Response.json({error:'Unknown local operation'},{status:404});
 }catch(error){return Response.json({error:'Could not read or save browser progress. '+(error instanceof Error?error.message:'Please check browser storage permissions.')},{status:400});}
}
