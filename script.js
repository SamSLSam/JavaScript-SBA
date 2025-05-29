







// function getLearnerData(course, ag, submissions) {
//     if (course.id !== ag.course_id) {
//       throw new Error("Assignment Group does not belong to the given Course.");
//     }
  
//     const results = [];
  
//     try {
//       const now = new Date();
//       const assignments = ag.assignments.filter(a => new Date(a.due_at) <= now && a.points_possible > 0);
  
//       const learnerMap = {};
  
//       for (const sub of submissions) {
//         const assignment = assignments.find(a => a.id === sub.assignment_id);
//         if (!assignment) continue;
  
//         const learnerId = sub.learner_id;
//         const scoreData = sub.submission;
  
//         if (!learnerMap[learnerId]) {
//           learnerMap[learnerId] = {
//             id: learnerId,
//             totalScore: 0,
//             totalPossible: 0
//           };
//         }
  
//         let points = Number(scoreData.score);
//         const possible = Number(assignment.points_possible);
//         const submittedAt = new Date(scoreData.submitted_at);
//         const dueAt = new Date(assignment.due_at);
  
//         if (isNaN(points) || isNaN(possible)) continue;
  
//         // Deduct 10% for late submission step
//         if (submittedAt > dueAt) {
//           points -= 0.1 * possible;
//         }
  
//         const percentage = points / possible;
  
//         learnerMap[learnerId][assignment.id] = Number(percentage.toFixed(3));
//         learnerMap[learnerId].totalScore += points;
//         learnerMap[learnerId].totalPossible += possible;
//       }
  
//       for (const learnerId in learnerMap) {
//         const learner = learnerMap[learnerId];
//         learner.avg = Number((learner.totalScore / learner.totalPossible).toFixed(3));
//         delete learner.totalScore;
//         delete learner.totalPossible;
//         results.push(learner);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error.message);
//     }
  
//     return results;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//   console.log(result);
  