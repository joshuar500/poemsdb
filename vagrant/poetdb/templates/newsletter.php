<?php
	
	//EMAIL VALIDATION
	function validateEmail($value){
		return preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/', $value);
	}
	
	//CHECK VARIABLES (EMPTY/NULL OR DEFAULT)
	if ( isset($_POST['email']) && $_POST['email']!="Email" ) {
		
		//CHECK EMAIL	
		if ( validateEmail($_POST['email']) ) {
			
			
			
			////////////////////// EDIT HERE  /////////////////////////
			
			//SET HERE YOUR DESTINATION EMAIL
			//IT SHOULD BE FROM THE SAME DOMAIN WHERE SITE IS HOSTED
			$destination="name@domain.com";
			
			//SET HERE YOUR EMAIL SUBJECT
			$subject="New Email subscribed to Newsletter";

			//MESSAGE DATA (HTML FORMATTED)
			$mailMessage.="<dt><strong>E-mail:</strong></dt><dd>".$_POST['email']."</dd>";
			$mailMessage = utf8_decode($mailMessage);
			
			////////////////////// END EDIT  /////////////////////////
			
			
			
			//SENDER EMAIL
			$mailFrom=$_POST['email'];
			
			//HEADER DATA
			$mailHeader="From:".$mailFrom."\nReply-To:".$_POST['name']."<".$mailFrom.">\n"; 
			$mailHeader=$mailHeader."X-Mailer:PHP/".phpversion()."\n"; 
			$mailHeader=$mailHeader."Mime-Version: 1.0\n"; 
			$mailHeader=$mailHeader."Content-Type: text/html";
			
			if ( mail($destination,$subject,$mailMessage,$mailHeader) ) {
				echo 'Thanks for subscribing!';
			}			
			else echo 'Server error. Please, try again later';
			
		}		
		else echo 'Non valid Email!';	//EMAIL VALIDATION ERROR
		
	}
	else echo 'Missing fields!';		//VARS ERROR		

?>