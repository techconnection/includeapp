<?php
function generatecookieid()
    {
        $text = "";
        $possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( $i=0; $i < 31; $i++ )
            $text .= $possible[rand(0, strlen($possible))];
        return $text;
    }
  if($_POST['cid'] != '') {
     if ( 0 < $_FILES['file']['error'] ) {
        //echo 'There was some error. Please choose a resume and reupload.';
        echo json_encode(array('status' => 'failure', 'msg' => 'There was some error. Please choose a resume and reupload.'));
    }
    else {
        
        $extension_check = pathinfo($_FILES['file']['name']);
        $whitelisted_extensions = array('doc','pdf', 'docx');
        if(!in_array($extension_check['extension'],$whitelisted_extensions)) {
            //echo 'Please choose only a document or pdf file.';
            echo json_encode(array('status' => 'failure', 'msg' => 'Please choose only a document or pdf file.'));
        } else {
           if( move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' .$_POST['cid'].'@'.generatecookieid().'@'.$_FILES['file']['name'])) {
              //echo 'Resume uploaded successfully.';
              echo json_encode(array('status' => 'success', 'msg' => 'Resume uploaded successfully.', 'resumefileurl' => $_POST['cid'].'@'.generatecookieid().'@'.$_FILES['file']['name'], 'resumefilename' => $_FILES['file']['name']));
              
            } else {
                //echo 'Please choose a resume.';
                echo json_encode(array('status' => 'failure', 'msg' => 'Please choose a resume.'));
            } 
        }
        
    } 
  } else {
      // echo 'Please login and then upload a resume.';
       echo json_encode(array('status' => 'failure', 'msg' => 'Please login and then upload a resume.'));
  }
   

?>
