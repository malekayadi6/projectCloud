var services = angular.module('services', []);
/*services.factory('myService',function ($http) {
   /* return{
        musaique:$http.get('/api/musaiquefm').success(function(data, status, headers, config) {
            var totalComments=0;
            var totalLikes=0;
            for(var i=0;i<data.length;i++){
                    if(data[i].likes != null)
                        totalLikes+=data[i].likes;
                    if(data[i].comments !=null)
                        totalComments+=data[i].comments;
            }
            console.log('likes'+totalLikes);
            console.log('comments'+totalComments);

            return {'likes':totalLikes,'comments':totalComments}
            }).error(function(data, status, headers, config) {
            console.log("erreru fdata"+status);
            // called asynchronously if an error occurs or server returns response with an error status
        }),
        chames:$http.get('/api/chamesfm').success(function(data, status, headers, config) {
            var totalComments=0;
            var totalLikes=0;
            for(var i=0;i<data.length;i++){
                if(data[i].likes != null)
                    totalLikes+=data[i].likes;
                if(data[i].comments !=null)
                    totalComments+=data[i].comments;
            }
            console.log('likes'+totalLikes);
            console.log('comments'+totalComments);

            return totalComments
        }).error(function(data, status, headers, config) {
            console.log("erreru fdata"+status);
            // called asynchronously if an error occurs or server returns response with an error status
        }),

    }

});
*/