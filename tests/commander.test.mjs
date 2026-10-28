import {test} from 'node:test';
import assert from 'node:assert/strict';
import {checkpointDebrief,lessonHint,missionDebrief} from '../lib/commander.ts';
import {lessons} from '../lib/curriculum.ts';
import {grade} from '../lib/grading.ts';
test('no success before a current result; errors override stale rows',()=>{
 assert.match(missionDebrief(false,'',4,'old',true),/Awaiting a current run/);
 assert.match(missionDebrief(true,'Invalid CSV',4,'old',true),/no current result/);
 assert.doesNotMatch(missionDebrief(true,'Invalid CSV',4,'old',true),/old/);
});
test('zero results are real results, not a completion claim',()=>{
 const text=missionDebrief(true,'',0,'No duplicate IDs found.',false);
 assert.match(text,/0 output rows/);assert.match(text,/does not award checkpoint XP/);
});
test('saving and network failures never claim completion',()=>{
 assert.match(checkpointDebrief(null,'','',true),/Wait for the assessment/);
 assert.match(checkpointDebrief([{correct:true,explanation:'ok'}],'Saved','Offline',false),/No new completion/);
});
test('debrief reflects actual graded answers and diagnostic message',()=>{
 const feedback=grade('python',['12','0']);
 const text=checkpointDebrief(feedback,'Review and retry.','',false);
 assert.match(text,/Check 1: correct/);assert.match(text,/Check 2: revisit/);
 assert.match(checkpointDebrief(grade('python',['12','20']),'Diagnostic complete; progress not saved.','',false),/progress not saved/);
});
test('every lesson has a contextual hint and source; wrong check is targeted',()=>{
 for(const lesson of lessons){assert.ok(lesson.sources.length);assert.match(lessonHint(lesson,['',''],null),/Check 1:/);assert.ok(lessonHint(lesson,['x','y'],[{correct:true,explanation:''},{correct:false,explanation:''}]).includes(lesson.questions[1].hint));}
});
