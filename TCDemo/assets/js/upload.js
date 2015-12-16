$(function() { 
               $(document).on("click", "button#resumeuploadbtn", function() {
               var file_data = $('#resumeuploadfile').prop('files')[0];  
               var cid = $('#resumeuploadfilecid').val();
               
              
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    form_data.append('cid', cid);
                                 
    $.ajax({
                url: 'upload.php', // point to server-side PHP script 
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(php_script_response){
                    alert(php_script_response); // display response from the PHP script, if any
                },
                error: function(php_script_response){
                    alert(php_script_response); // display response from the PHP script, if any
                }
     }); 
        });
    
});


