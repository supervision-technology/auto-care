/* 
 *  fixed-length-filter.js
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 13, 2016, 6:24:57 PM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
(function () {
    angular.module("appModule")
            .filter("fixedLength", function () {
                return function (n, l) {
                    return(1e4 + '' + n).slice(-l);
                };
            });
}());

