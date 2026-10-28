import {getChatGPTUser} from '@/app/chatgpt-auth';
import {database} from '@/lib/storage';
import {grade} from '@/lib/grading';
import {lessons} from '@/lib/curriculum';
export async function POST(request:Request){
 if(request.headers.get('origin')&&new URL(request.headers.get('origin')!).host!==new URL(request.url).host)return Response.json({error:'Request origin rejected'},{status:403});
 const user=await getChatGPTUser();if(!user)return Response.json({error:'Sign in to submit and save assessments.'},{status:401});
 let body;try{const raw=await request.text();if(raw.length>4000)throw Error();body=JSON.parse(raw);}catch{return Response.json({error:'Invalid submission'},{status:400});}
 let feedback;try{feedback=grade(body.lessonId,body.answers);}catch{return Response.json({error:'Please answer both questions.'},{status:400});}
 try{const db=database();const index=lessons.findIndex(l=>l.id===body.lessonId);const diagnostic=body.mode==='diagnostic';
 if(index>0&&!diagnostic){const previous=await db.prepare('SELECT lesson_id FROM learning_progress WHERE user_id = ? AND lesson_id = ?').bind(user.userId,lessons[index-1].id).first();if(!previous)return Response.json({error:'Pass the previous lesson before submitting this checkpoint.'},{status:409});}
 const score=feedback.filter(x=>x.correct).length;const passed=score===feedback.length;const now=new Date().toISOString();const statements=[db.prepare('INSERT INTO learning_attempts (id,user_id,lesson_id,score,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),user.userId,body.lessonId,score,now)];
 if(passed&&!diagnostic)statements.push(db.prepare('INSERT INTO learning_progress (user_id,lesson_id,completed_at,score) VALUES (?,?,?,?) ON CONFLICT(user_id,lesson_id) DO NOTHING').bind(user.userId,body.lessonId,now,score));const written=await db.batch(statements);
 return Response.json({passed,feedback,saved:passed&&!diagnostic,earned:passed&&!diagnostic&&(written[1]?.meta?.changes??0)>0});
 }catch(e){console.error('Assessment save failed',e);return Response.json({error:'Could not save this attempt. Your answers are still here; please retry.'},{status:503});}}
