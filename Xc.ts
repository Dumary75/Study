

 type TEST = {
   name: 'blabla' ;
   permission:  {
      test2: 'xy';
      nb: 23; 
   }[];
 };

 type perObj = TEST['permission'];

 const xy: perObj = [{
    test2: 'xy',
    nb: 23
 }]

 console.log(xy);