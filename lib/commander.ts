import type {Lesson} from './curriculum';
export type CheckFeedback = {correct:boolean;explanation:string};
export function checkpointDebrief(feedback:CheckFeedback[]|null, message:string, error:string, busy:boolean) {
 if(busy)return 'Assessment in progress. Wait for the assessment response before drawing a conclusion.';
 if(error)return `Assessment unavailable: ${error} No new completion is confirmed.`;
 if(!feedback)return 'No current assessment result. Answer the questions and submit when ready.';
 return [message, ...feedback.map((f,i)=>`Check ${i+1}: ${f.correct?'correct':'revisit'}. ${f.explanation}`)].join(' ');
}
export function lessonHint(lesson:Lesson, answers:string[], feedback:CheckFeedback[]|null){
 const index=feedback?.findIndex(f=>!f.correct)??-1;
 const target=index>=0?index:Math.max(0,answers.findIndex(a=>!a.trim()));
 return `Check ${target+1}: ${lesson.questions[target].hint}${lesson.code?' Trace the displayed code one operation at a time; this exercise does not execute R or Python.':''}`;
}
export function missionDebrief(ran:boolean,error:string,rowCount:number,explanation:string,recorded:boolean){
 if(error)return `Input needs attention: ${error} Correct the input and run again; no current result is confirmed.`;
 if(!ran)return 'Awaiting a current run. Inspect the input, predict the result, then run the example.';
 return `${rowCount} output ${rowCount===1?'row':'rows'}. ${explanation} ${recorded?'Your interpretation is recorded for this session; it has not been scientifically graded.':'Record your interpretation and the next check you would make.'} This example does not award checkpoint XP.`;
}
