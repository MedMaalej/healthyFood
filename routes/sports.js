exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM sport',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('sports',{page_title:"Sports",data:rows});
                           
         });
       
    });
  
};

exports.add = function(req, res){
  res.render('add_sport',{page_title:"Add sports"});
};

exports.edit = function(req, res){
    
  var id = req.params.id;
    
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM sport WHERE sportId = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_sport',{page_title:"Edit sport",data:rows});
                           
         });
                 
    }); 
};

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
                      
            sportId    : input.sportId,
	    sportName    : input.sportName,	
            sportCaloriesPerHour : input.sportCaloriesPerHour
	    
        
        };
        
        var query = connection.query("INSERT INTO sport set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/sports');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {

                
             sportId    : input.sportId,
	    sportName    : input.sportName,	
            sportCaloriesPerHour : input.sportCaloriesPerHour
            
        
        };
        
        connection.query("UPDATE sport set ? WHERE sportId = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/sports');
          
        });
    
    });
};

exports.delete_food = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM sport  WHERE sportId = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/sports');
             
        });
        
     });
};
