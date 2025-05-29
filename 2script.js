// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.

    // Step 1. find out who are the students [125,125,125,132,132]
  
    let learnerId =  []
  
    for (let i = 0; i <LearnerSubmissions.length;i++) {
      learnerId.push(LearnerSubmissions[i].learner_id)
  }
    console.log(learnerId)

    // Step 2. remove duplicate student ids [125,132]
      let uniqueLearnersIds = learnerId.filter(function(id, index) {
        return learnerId.indexOf(id) === index;
      });


    //Step 3. you need to make it an array of objects [{id:125},{id:132}]
    let learners = uniqueLearnersIds.map(function(id){
      return { id: id };
    })
    console.log(learners);
  
// Step 4: get only valid assignments 
let today = new Date();
let validAssignments = AssignmentGroup.assignments.filter(function(assignment){
  return new Date(assignment.due_at) <= today && assignment.points_possible > 0;
});

// Step 5. for each learner, find their score per valid assignment
for (let i = 0; i < learners.length; i++) {
  let learner = learners[i];
  let totalScore = 0;
  let totalPossible = 0;

  for (let j = 0; j < validAssignments.length; j++) {
    let assignment = validAssignments[j];

    let submission = LearnerSubmissions.find(function(s) {
      return s.learner_id === learner.id && s.assignment_id === assignment.id;
    });
    
    // process a learner’s grade if they actually submitted. 
    // prepares the numeric and date data required for late penalties & the percentage grade
    // get learner's score and convert score to number
    // max score possible and convert possible points to number
    // submission date
    // due date

    if (submission) {
      let score = Number(submission.submission.score);
      let possible = Number(assignment.points_possible);
      let submitted = new Date(submission.submission.submitted_at);
      let due = new Date(assignment.due_at);

    
    // Step 6. deduct 10% if late
    if (submitted > due) {
      score = score - (0.1 * possible);
    }

    // Step 7. divide score by possible points
    // stores score with assignment ID
    // get average, round to 3 decimal places, convert string to number
    let percent = score / possible;
    learner[assignment.id] = Number(percent.toFixed(3));

    totalScore += score;
    totalPossible += possible;

    }
  }
  learner.avg = Number((totalScore / totalPossible).toFixed(3));
}

console.log(learners)

    // const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0 // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150
    //   }
    // ];
  
    // return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  