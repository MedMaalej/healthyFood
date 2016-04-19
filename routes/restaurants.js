exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM restaurant',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('restaurants',{page_title:"Restaurants",data:rows});
                           
         });
       
    });
  
};

exports.add = function(req, res){
  res.render('add_restaurant',{page_title:"Add restaurants"});
};

exports.edit = function(req, res){
    
  var id = req.params.id;
    
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM restaurant WHERE restaurantId = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_restaurant',{page_title:"Edit restaurants",data:rows});
                           
         });
                 
    }); 
};

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
                      
            restaurantId    : input.restaurantId,
	    restaurantName    : input.restaurantName,	
            restaurantAddress : input.restaurantAddress,
	    restaurantPhoneNumber : input.restaurantPhoneNumber
        
        };
        
        var query = connection.query("INSERT INTO restaurant set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/restaurants');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {

                
            restaurantId    : input.restaurantId,
	    restaurantName    : input.restaurantName,	
            restaurantAddress : input.restaurantAddress,
	    restaurantPhoneNumber : input.restaurantPhoneNumber
            
        
        };
        
        connection.query("UPDATE restaurant set ? WHERE restaurantId = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/restaurants');
          
        });
    
    });
};

exports.delete_food = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM restaurant  WHERE restaurantId = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/restaurants');
             
        });
        
     });
};
