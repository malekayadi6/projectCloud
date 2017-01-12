/**
 * Created by malek on 26/11/16.
 */

var app=angular.module('Myapp',['chart.js']);
app.controller('ctrl',function ($scope,$http) {
    $scope.labels = ['Mosiaque fm ', 'Chames fm ', 'Radio ifm '];
    $scope.series = ['Likes', 'Comments'];
var like =new Array(3);
var comm=new Array(3);
var tab=[];
   console.log(typeof tab);
    var t = 0;





        $http.get('/api/musaiquefm').success(function (data, status, headers, config) {
            var totalComments = 0;
            var totalLikes = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].likes != null)
                    totalLikes += data[i].likes;
                if (data[i].comments != null)
                    totalComments += data[i].comments;
            }
            $scope.dateDM=data[0].created_time;
            $scope.dateFM=data[data.length - 1].created_time;
            $scope.nbrMosaique=data.length;
            $scope.likesMosaique=totalLikes;
            $scope.commentsMosaique=totalComments;
            like[0]=totalLikes;
              comm[0]=totalComments;
              tab=[like,comm];
            $scope.data = tab;
            $scope.data1=like;


        }).error(function (data, status, headers, config) {
            console.log("erreru fdata" + status);
            // called asynchronously if an error occurs or server returns response with an error status
        })
        $http.get('/api/radiofm').success(function (data, status, headers, config) {
            var totalComments = 0;
            var totalLikes = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].likes != null)
                    totalLikes += data[i].likes;
                if (data[i].comments != null)
                    totalComments += data[i].comments;
            }
            $scope.dateDR=data[0].created_time;
            $scope.dateFR=data[data.length - 1].created_time;

            $scope.nbrRadioIfm=data.length;

            $scope.likesRadio=totalLikes;
            $scope.commentsRadio=totalComments;
            like[2]=totalLikes;
            comm[2]=totalComments;
            tab=[like,comm];
            $scope.data = tab;
            $scope.data1=like;



        }).error(function (data, status, headers, config) {
            console.log("erreru fdata" + status);
        })

    $http.get('/api/chamesfm').success(function (data, status, headers, config) {
            var totalComments = 0;
            var totalLikes = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].likes != null)
                    totalLikes += data[i].likes;
                if (data[i].comments != null)
                    totalComments += data[i].comments;
            }
        $scope.nbrChames=data.length;
        $scope.dateDC=data[0].created_time;
        $scope.dateFC=data[data.length - 1].created_time;

        $scope.likesChames=totalLikes;
        $scope.commentsChames=totalComments;
        like[1]=totalLikes;
        comm[1]=totalComments;
        $scope.data1=like;
        tab=[like,comm];
        $scope.data = tab;



        }).error(function (data, status, headers, config) {
            console.log("erreru fdata" + status);
        })


});