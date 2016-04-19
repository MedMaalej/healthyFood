exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM food_restaurant',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('foods_restaurants',{page_title:"Foods per restaurant",data:rows});
                           
         });
       
    });
  
};

exports.add = function(req, res){
  res.render('add_food_restaurant',{page_title:"Add food_restaurant"});
};

exports.edit = function(req, res){
    
  var id = req.params.id;
 
    
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM food_restaurant WHERE id = ? ',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_food_restaurant',{page_title:"Edit foods_restaurants",data:rows});
                           
         });
                 
    }); 
};

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            id : input.id,         
            idFood    : input.idFood,
	    idRestaurant   : input.idRestaurant,	
	    foodPictureURL    : input.foodPictureURL,	
            foodNumberOfCalories : input.foodNumberOfCalories
        
        };
        
        var query = connection.query("INSERT INTO food_restaurant set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/foods_restaurants');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {

	    id : input.id,         
            idFood    : input.idFood,
	    idRestaurant   : input.idRestaurant,	
	    foodPictureURL    : input.foodPictureURL,	
            foodNumberOfCalories : input.foodNumberOfCalories
            
        
        };
        
        connection.query("UPDATE food_restaurant set ? WHERE id = ?",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/foods_restaurants');
          
        });
    
    });
};

exports.delete_food = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM food_restaurant WHERE id = ?",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/foods_restaurants');
             
        });
        
     });
};
