	
//-------------------------------------------------------------
//	Global variables
//-------------------------------------------------------------

	var correct = 0;
	var wrong = 0;
	var timer = $("<div>");
	var intervalId;
	var question_asked = 0;

//-------------------------------------------------------------
//	Game summary function
//-------------------------------------------------------------
	function displayStat() {

		var summary = $(".firstPage");
		summary.html("<h2>Summary</h2>");
		summary.append("<h3>Correct answers : " + correct + "</h3>");
		summary.append("<h3>Wrong answers : " + wrong + "</h3><br>");
		summary.append("<button id=play_again>Play Again?</button>");

		// Restart a game
		$("#play_again").on("click", function(event) {
			correct = 0;
			wrong = 0;
			question_asked = 0;
			timer.empty();
			displayQuestion();
		});

	} 

//-------------------------------------------------------------
//	Timer function
//-------------------------------------------------------------
	function showTime() {
		
		var number = 10;
		

		function run() {
      		intervalId = setInterval(decrement, 1000);
    	} // End function run()

	    function decrement() {

	      number--;
	      timer.css('color','blue');
	      timer.html("<h2>Time Left: " + number + "</2>");

	      if (number === 0) {
	        alert("Time Up!");
	        // Stop timer
	        clearInterval(intervalId);
	        // Unanswer question is counted as a wrong answer
	        wrong++;
	        question_asked++;
	        // Keep track of question asked
	        if (question_asked+1 < 4) {
        			setTimeout(() => {displayQuestion()}, 2000);
        		} else {
        			setTimeout(() => {displayStat()}, 2000);
        		}
	      }

	    } 

	    run();

	}; // End function showTime()

//-------------------------------------------------------------
//	Display questions function
//-------------------------------------------------------------
	function displayQuestion() {

		// Get trivia questions
        $.ajax({
        	url: "https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple",
        	method: "GET"
        }).done(function(response){

        	// Create question class to hold question and answers
        	var question = $(".firstPage");
        
        	// Display timer
        	showTime();
        	question.html(timer);
        	// Display question
			question.append("<p>" + response.results[0].question + "</p>");
			// Choice 1
			question.append("<input type=\"radio\" name=\"question\" id=\"choice1\" value='"+response.results[0].correct_answer+"'>");
			question.append("<label for=\"choice1\">" + response.results[0].correct_answer + "</label><br>")
			// Choice 2
			question.append("<input type=\"radio\" name=\"question\" id=\"choice2\" value='" + response.results[0].incorrect_answers[0]+ "'>");
			question.append("<label for=\"choice1\">" + response.results[0].incorrect_answers[0] + "</label><br>")
			// Choice 3
			question.append("<input type=\"radio\" name=\"question\" id=\"choice3\" value='" + response.results[0].incorrect_answers[1] + "'>");
			question.append("<label for=\"choice1\">" + response.results[0].incorrect_answers[1] + "</label><br>")
			// Choice 4
			question.append("<input type=\"radio\" name=\"question\" id=\"choice4\" value='"+ response.results[0].incorrect_answers[2] + "'>");
			question.append("<label for=\"choice1\">" + response.results[0].incorrect_answers[2] + "</label><br><br>")
			// Add Submit button
			question.append("<input type=\"button\" id=\"btnGetValue\" Value=\"Submit\" />");
			// Append to class firstpage
			$(".firstPage").append(question);
			// Check answer
			$('#btnGetValue').click(function() {
				event.preventDefault();
				clearInterval(intervalId);
        		var selValue = $('input[name="question"]:checked').val();
								
        		// Update score
        		if (response.results[0].correct_answer == selValue) {
        			correct = correct + 1;
        			timer.html("<h2>Correct!</h2>").css('color', 'green');
        			
        		} else {
        			wrong = wrong + 1;
        			timer.css('text-align','center');
        			timer.html("<h2>Wrong!</h2>").css('color', 'red');
        			
        		}

        		// Keep track of number of questions
        		if (question_asked+1 < 3) {
        			setTimeout(() => {displayQuestion()}, 2000);
        		} 
        		// Go to summary page 
        		else {
        			setTimeout(() => {displayStat()}, 2000);
        		}

        		question_asked++;

        	});
        });
	}

//-------------------------------------------------------------
//	main jquery
//-------------------------------------------------------------
	$(".btn").on("click", function (event){
		// alert("you clicked me");
		displayQuestion();
	})



