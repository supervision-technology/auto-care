/* 
 *  input-component.js
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 12, 2016, 11:22:05 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
(function () {
    angular.module("appModule")
            .directive('smartInput', function () {
                function setCaretPosition(elem, caretPos) {
                    if (elem !== null) {
                        if (elem.createTextRange) {
                            var range = elem.createTextRange();
                            range.move('character', caretPos);
                            range.select();
                        } else {
                            if (elem.setSelectionRange) {
                                elem.setSelectionRange(caretPos, caretPos);
                                elem.focus();
                            } else {
                                elem.focus();
                            }
                        }
                    }
                }

                return{
                    require: '?ngModel',
                    restrict: 'A',
                    link: function (scope, element, attrs, modelCtrl) {
                        element.bind('focus', function () {
                            //select all
                            try {
                                this.selectionStart = 0;
                                this.selectionEnd = this.value.length + 1;
                            } catch (err) {
                                this.select();
                            }
                        });
                        element.bind('blur', function () {
                            validateValue();
                        });

                        modelCtrl.$parsers.push(function (inputValue) {
                            var inputVal = element.val();
                            var type = attrs.smartInput;
                            if (type === undefined || type === '') {
                                type = 'text';
                            }

                            if (type === 'decimal' || type === 'integer') {
                                //clearing leading zeros
                                while (inputVal.charAt(0) === '0') {
                                    inputVal = inputVal.substr(1);
                                }

                                var decimalPrecision;
                                if (type === 'decimal') {
                                    inputVal = inputVal.replace(/[^\d.\',']/g, '');
                                    decimalPrecision = parseInt(attrs.decimalPrecision);
                                    if (isNaN(decimalPrecision)) {
                                        decimalPrecision = 2;
                                    }
                                } else if (type === 'integer') {
                                    inputVal = inputVal.replace(/[^\d\',']/g, '');
                                    decimalPrecision = -1;
                                }

                                var point = inputVal.indexOf(".");
                                if (point >= 0) {
                                    inputVal = inputVal.slice(0, point + 1 + decimalPrecision);
                                }

                                var decimalSplit = inputVal.split(".");
                                var intPart = decimalSplit[0];
                                var decPart = decimalSplit[1];

                                intPart = intPart.replace(/[^\d]/g, '');
                                if (intPart.length > 3) {
                                    var intDiv = Math.floor(intPart.length / 3);
                                    while (intDiv > 0) {
                                        var lastComma = intPart.indexOf(",");
                                        if (lastComma < 0) {
                                            lastComma = intPart.length;
                                        }

                                        if (lastComma - 3 > 0) {
                                            intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
                                        }
                                        intDiv--;
                                    }
                                }

                                if (decPart === undefined) {
                                    decPart = "";
                                } else {
                                    decPart = "." + decPart;
                                }
                                var res = intPart + decPart;

                                if (res !== inputValue) {
                                    modelCtrl.$setViewValue(res);
                                    modelCtrl.$render();
                                }

                                //model value as float
                                var val = parseFloat(res.replace(/[\',']/g, ''));
                                return isNaN(val) ? 0 : val;
                            } else if (type === 'date') {
                                //clearing leading zeros
                                while (inputVal.charAt(0) === '0') {
                                    inputVal = inputVal.substr(1);
                                }

                                inputVal = inputVal.replace(/[^\d\'#'\-]/g, '');
                                console.log(inputVal+"---");

                                var split = inputVal.split("-");
                                var year = split[0];//inputVal.substr(0,4);//
                                var month = split[1];//inputVal.substr(5,7);// 
                                var day = split[2];//inputVal.substr(8,10);//
                                console.log(year +"+"+month+"+"+day);

                                var caretPos = -1;

                                if (year === undefined) {
                                    year = "#".repeat(4);
                                    caretPos = 0;
                                } else {
                                    year = year.replace(/[^\d]/g, '');
                                    caretPos = year.length;
                                    year = year.substr(0, 4);
                                    year = year + "#".repeat(4 - year.length);
                                }

                                if (month === undefined) {
                                    month = "#".repeat(2);
                                    caretPos = caretPos === 4 ? 5 : caretPos;
                                } else {
                                    month = month.replace(/[^\d]/g, '');
                                    if (parseInt(month) > 12) {
                                        month = "";
                                    }
                                    caretPos = caretPos === 4 ? 5 + month.length : caretPos;
                                    month = month.substr(0, 2);
                                    month = month + "#".repeat(2 - month.length);
                                }

                                if (day === undefined) {
                                    day = "#".repeat(2);
                                    caretPos = caretPos === 7 ? 8 : caretPos;
                                } else {
                                    day = day.replace(/[^\d]/g, '');
                                    if (day > new Date(parseInt(year), parseInt(month), 0).getDate()) {
                                        day = "";
                                    }
                                    caretPos = caretPos === 7 ? 8 + day.length : caretPos;
                                    day = day.substr(0, 2);
                                    day = day + "#".repeat(2 - day.length);
                                }

                                var res = year + "-" + month + "-" + day;
                                if (res !== inputVal) {
                                    modelCtrl.$setViewValue(res);
                                    modelCtrl.$render();
                                    setCaretPosition(element[0], caretPos);
                                }

                                if (res.indexOf("#") > 0) {
                                    return null;
                                } else {
                                    return new Date(res);
                                }
                            }
                        });

                        //validate rendering value after editing
                        var validateValue = function () {
                            var inputVal = element.val();
                            var type = attrs.smartInput;
                            if (type === undefined || type === '') {
                                type = 'text';
                            }

                            if (type === 'decimal') {
                                var decimalPrecision = parseInt(attrs.inputDecimal);
                                if (isNaN(decimalPrecision)) {
                                    decimalPrecision = 2;
                                }

                                var decimalSplit = inputVal.split(".");
                                var intPart = decimalSplit[0];
                                var decPart = decimalSplit[1];

                                if (intPart === undefined ? true : intPart === '') {
                                    intPart = "0";
                                }
                                if (decPart === undefined) {
                                    decPart = "0".repeat(decimalPrecision);
                                } else {
                                    decPart = decPart + "0".repeat(decimalPrecision - decPart.length);
                                }

                                element.val(intPart + "." + decPart);
                            } else if (type === 'integer') {
                                //do nothing
                                if (inputVal === undefined ? true : inputVal === '') {
                                    inputVal = "0";
                                }

                                element.val(inputVal);
                            } else if (type === 'date') {
                                if (inputVal === undefined ? true : inputVal === '') {
                                    inputVal = "####-##-##";
                                }

                                element.val(inputVal);
                            }
                        };


                        //validate value
                        element.ready(function () {
                            validateValue();
                        });
                    }
                };
            });

}());