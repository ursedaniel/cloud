// module.exports = {
//     Print: function (content) {
//         alert('test');
//         document.getElementById("translateJson").innerHTML = content;
//     }
// };

(function () {
    funcOne = function() {
        console.log('mlt funcOne here');
        alert('test');
    };

    funcThree = function(firstName) {
        console.log(firstName, 'calls funcThree here');
    };

    name = "Mulatinho";
    myobject = {
        title: 'Node.JS is cool',
        funcFour: function() {
            return console.log('internal funcFour() called here');
        }
    }
})();
