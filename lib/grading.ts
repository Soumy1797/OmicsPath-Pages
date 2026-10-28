// GitHub Pages practice answer keys: intentionally public in the client bundle. Not secure certification.
export const keys:Record<string,{answers:string[];feedback:string[]}>= {
question:{answers:['1','2'],feedback:['Donors are independently sampled; paired conditions belong to each donor.','Perfectly confounded treatment and batch cannot be separated from these data.']},
files:{answers:['0','5'],feedback:['pwd prints the current working directory.','-n 5 requests up to five lines, including any header.']},
python:{answers:['12','20'],feedback:['Python index 0 selects 12.','(12 + 18 + 30) / 3 = 20.']},
r:{answers:['2','1'],feedback:['The values 10 and 20 pass >= 10.','NA represents missingness and is not equivalent to a measured zero.']},
metadata:{answers:['1','0'],feedback:['Reorder by identifiers, then verify exact agreement.','In this count matrix, genes are rows and samples are columns.']},
sequences:{answers:['8','75'],feedback:['The two Ns are excluded: eight canonical bases remain.','Six G/C bases divided by eight canonical bases gives 75%.']},
blast:{answers:['1','2'],feedback:['blastp compares a protein query with protein sequences.','High identity across a short region does not establish full-length equivalence.']},
counts:{answers:['2','1'],feedback:['The basic count-matrix workflow uses unnormalised integer counts.','Read depth does not create independently sampled donors.']},
statistics:{answers:['1','1'],feedback:['2 to the power -1 equals 0.5.','Adjusted p = 0.20 fails the < 0.05 threshold despite the large estimated effect.']},
reproduce:{answers:['1','2'],feedback:['Reproducibility needs inputs, procedures, parameters and environment information.','Keep secrets outside version-controlled source.']},
capstone:{answers:['0','2'],feedback:['A and D pass both rules; B fails adjusted p and C fails effect size.','These are candidates under a declared rule, not proven targets or mechanisms.']}
};
export function grade(id:string, answers:unknown){const key=keys[id]; if(!key||!Array.isArray(answers)||answers.length!==key.answers.length||answers.some(a=>typeof a!=='string'||a.length>300))throw new Error('Invalid assessment');return key.answers.map((expected,i)=>({correct:answers[i].trim()===expected||(['files','python','r','sequences'].includes(id)&&/^\d+(\.\d+)?$/.test(answers[i].trim())&&Number(answers[i])===Number(expected)),explanation:key.feedback[i]}));}
