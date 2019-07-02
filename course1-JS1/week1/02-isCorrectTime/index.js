/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
//запись с помощью условного опреатора if
/*  if ((hours >= 0) && (hours <= 23) && (minutes >= 0) && (minutes <= 59)) {
      return true;
  } else {
      return false;
  }*/
//более короткая запись
   return ((hours >= 0) && (hours <= 23) && (minutes >= 0) && (minutes <= 59));
};
