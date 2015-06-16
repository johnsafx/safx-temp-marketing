$(function(){
	// ID for div that contains the email form
	var emailFormGroup = $("#emailFormGroup");
	emailFormGroup.hide();
	emailFormGroup.attr("class","input-group");
	$("#messageBox").hide();

	// ID for div that contains the action button
   	var actionButtonContainer = $("#actionButtonContainer");

   	// ID for the actual "Get Early Access button"
	var actionButton = $("#actionButton");

	// ID for the input of the email address
	var emailAddressInput = $("#emailAddress");

	// ID for the submit button for the email form
	var formSubmit = $("#formSubmit");

	// ID for the form tag of email address form (this is different from emailFormGroup)
	var emailForm = $("#emailForm");

	// Institutional forms and IDs
	var institutionalLink = $("#institutionalLink");
	var institutionalForm = $("#institutionalForm");
	var institutionalSubmit = $("#institutionalSubmit");
	var institutionalContent = $("#institutionalContent");
	var institutionalModalTitle = $("#institutionalModalTitle");

	var institutionalCompanyName = $("#companyName");
	var institutionalFirstName = $("#firstName");
	var institutionalLastName = $("#lastName");
	var institutionalEmail = $("#institutionalEmail");
	var institutionalHelp = $("#institutionalHelp");
	var institutionalThanks = $("#institutionalThanks");
	institutionalThanks.hide();

	// Fade in the elements
		$("#hooker").fadeTo(500, 1);
		$("#explainer").fadeTo(500, 1, function(){
			$("#actionButtonContainer").fadeTo(500, 1);
			$("#footer").fadeTo(1000, 1);
		});
		
	/*
	* Click handler used to animate the swapping out of the action button and the email form
	*/
	actionButton.click(function(){
        actionButton.animate({width: '100%'}, 500, "easeOutExpo", function() {
        	$("#actionButtonContainer").fadeOut(0, function(){
        		emailFormGroup.show().css("display", "table")
        		emailAddressInput.focus();
        		institutionalLink.fadeTo(1000, 1.0);
        	});       	
        });
    });

	/*
	* Email form submit handler.  Overrides and does the post itself.
	*/
    emailForm.submit(function(event){
    	event.preventDefault();
    	console.log("Email address entered:");
    	console.log(emailAddressInput.val());

    	var url = emailForm.attr("action");
    	var posting = $.post(url, {emailAddress:emailAddressInput.val()});

    	console.log("Posting to: ")
    	console.log(url);

    	posting.done(function(data){
    		console.log("Success")
    		emailForm.fadeOut(function(){
    			$("#messageBox").show();
    			$("#messageBox").text("Thanks! You're first in line for our beta.");
    			$("#messageBox").fadeTo(500, 1);
    		});

    	});

    	posting.fail(function(data){
    		console.log("Failure.  See data:  ")
    		console.log(data)
    		emailAddressInput.val("Something went wrong.  Try again?");
    	});
    });

    /*
	* Institutional interest form submit handler
	*/
	institutionalSubmit.click(function(event){
		event.preventDefault();

		var url = institutionalForm.attr("action");
		var posting = $.post(url, {emailAddress:emailAddressInput.val()});

		posting.done(function(data){
    		console.log("Success")
    		institutionalForm.fadeOut();
    		$(".modal-content").animate({height:"160px"}, 500);
    		institutionalContent.hide();
    		institutionalModalTitle.hide();
    		institutionalThanks.show();
    		
    	});

    	posting.fail(function(data){
    		console.log("Failure.  See data:  ")
    		console.log(data)
    		institutionalHelp.text("Hey.  Something went wrong.  Deb will replace this with a better error message.");
    		institutionalHelp.css("color","#F07B00");
    	});
	});

});