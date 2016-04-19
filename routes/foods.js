exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM food',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('foods',{page_title:"Foods",data:rows});
                           
         });
       
    });
  
};

exports.add = function(req, res){
  res.render('add_food',{page_title:"Add foods"});
};

exports.edit = function(req, res){
    
  var id = req.params.id;
    
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM food WHERE foodId = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_food',{page_title:"Edit foods",data:rows});
                           
         });
                 
    }); 
};

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
                      
            foodId    : input.foodId,
	    foodName    : input.foodName,	
            foodType : input.foodType
        
        };
        
        var query = connection.query("INSERT INTO food set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/foods');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {

                
            foodId    : input.foodId,
	    foodName    : input.foodName,	
            foodType : input.foodType
            
        
        };
        
        connection.query("UPDATE food set ? WHERE foodId = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/foods');
          
        });
    
    });
};

exports.delete_food = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM food  WHERE foodId = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/foods');
             
        });
        
     });
};
